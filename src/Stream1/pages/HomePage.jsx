import { useRef, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import axios from 'axios'
import api from '../api'
import PromptForm from '../components/PromptForm'
import StreamingResult from '../components/StreamingResult'

// 분석 요청 직후, 첫 번째 SSE 이벤트가 도착하기 전까지 보여줄 초기 상태 문구
const INITIAL_STATUS = 'Agent가 분석을 준비하고 있습니다...'

/**
 * SSE(Server-Sent Events) 프로토콜 텍스트 버퍼를 파싱하는 순수 함수.
 *
 * 백엔드는 "event: <이름>\ndata: <JSON>\n\n" 형태의 텍스트를 흘려보내는데,
 * 네트워크 청크 단위로 끊겨서 도착하기 때문에 한 번에 완전한 메시지가 오지 않을 수 있다.
 * 그래서 "\n\n"(메시지 구분자)을 기준으로 자르고,
 * 마지막 조각은 아직 끝나지 않은 메시지일 수 있으므로 "leftover"로 남겨 다음 호출에 이어붙인다.
 *
 * @param {string} buffer 지금까지 누적된 원시 SSE 텍스트
 * @returns {{events: {event: string, data: string}[], leftover: string}}
 *          파싱이 완료된 이벤트 목록과, 아직 미완성인 나머지 텍스트
 */
const parseSseBuffer = (buffer) => {

  const messages = buffer.split('\n\n');
  const leftover = messages.pop() ?? '';   // 배열의 마지막 요소를 꺼냄. 아직 "\n\n" 으로 끝나지 않은, 다음 청크와 합쳐져야 할 미완성 부분

  const events = []

  for (const raw of messages) {
    if (!raw.trim()) continue;  // 빈 메시지 (연속된 구분자) 는 건너뜀.  

    let eventType = 'message';  // event:  줄이 없으면 SSE 기본 이벤트명 "message"
    let dataStr = ''

    // 한 메세지는 여러 줄("event: ...", "data:...") 으로 구성될수 있어 줄 단위로 분석한다.
    for (const line of raw.split('\n')) {
      if (line.startsWith('event:')) {
        eventType = line.slice(6).trim();   // "event:" 이후 텍스트가 이벤트 이름
      } else if (line.startsWith('data:')) {
        dataStr += line.slice(5).trim();   // data:  줄이 여러개 이면 이어 붙이기
      }
    }
    events.push({ event: eventType, data: dataStr })
  }

  return { events, leftover }
}


const HomePage = () => {

  // 사용자가 입력한 회사명
  const [companyName, setCompanyName] = useState('')
  // 지금까지 스트리밍으로 누적된 분석 결과(마크다운) 텍스트
  const [content, setContent] = useState('')
  // 첫 토큰이 도착하기 전까지의 "로딩 스피너 표시" 여부
  const [isLoading, setIsLoading] = useState(false)
  // 현재 분석 요청이 진행 중인지 여부 (폼의 입력 잠금/취소버튼 전환에 사용)
  const [isStreaming, setIsStreaming] = useState(false)
  // 에러 메시지 (없으면 null)
  const [error, setError] = useState(null)
  // 로딩 중 보여줄 상태 텍스트 (도구 사용 현황 등으로 갱신됨)
  const [statusText, setStatusText] = useState(INITIAL_STATUS)

  // 리렌더링과 무관하게 "현재 요청 사이클" 동안 유지되어야 하는 값이라 useRef로 관리한다.
  // 현재 진행 중인 요청을 취소하기 위한 abortController
  const abortControllerRef = useRef(null)
  const sseBufferRef = useRef('')   // parseSseBuffer에 누적해서 넘길 미완성 SSE 텍스트
  const readLengthRef = useRef(0)   // 지금까지 axios 가 읽어들인 응답 텍스트의 총 길이 (다음 chunk 추출용)

  // 서버에서 새로 도착한 SSE 원시 텍스트 조각(rawChunk)을 처리하는 함수.
  // parseSseBuffer로 완전한 이벤트들을 뽑아낸 뒤, 이벤트 종류별로 화면 상태를 갱신한다.
  const handleSseChunk = (rawChunk) => {
    sseBufferRef.current += rawChunk

    const { events, leftover } = parseSseBuffer(sseBufferRef.current);
    sseBufferRef.current = leftover;   // 미완성 부분은 버퍼에 남겨 다음 청크와 합쳐지도록 해야함

    for (const evt of events) {
      if (!evt.data) continue;
      let payload;
      try {
        payload = JSON.parse(evt.data)
      } catch {
        // 드물게 , data 가 올바른 JSON 이 아닌경우... 조용히 무시.
        continue;
      }

      if (evt.event === 'token') {
        // LLM이 생성한 텍스트 조각(token)이 도착 -> 로딩 스피너를 끄고 결과 텍스트에 이어붙인다.
        setIsLoading(false)
        setContent((prev) => prev + payload.content)
      } else if (evt.event === 'tool_start') {
        // Agent가 도구를 사용하기 시작했음을 알리는 이벤트 -> 상태 문구를 갱신해 사용자에게 진행상황을 보여줌
        setStatusText(`🔧 ${payload.tool} 도구를 사용 중입니다...`)
      } else if (evt.event === 'error'){
        // 백엔드(Agent 실행)에서 에러가 발생했음을 알리는 이벤트
        setError(payload.message)        
      }

      // 'tool_end', 'done', 'cancelled' 이벤트는 현재 별도 상태 갱신이 필요하지 않아 무시한다.

    }

  } // end handleSseChunk()

  // "분석 시작" 폼 제출 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!companyName.trim() || isStreaming) return;  // 빈 입력이나 이미 진행중이면 무시

    // 새 요청을 시작하기 전에 이전 결과/상태를 모두 초기화
    setContent('')
    setError(null)
    setStatusText(INITIAL_STATUS)
    setIsLoading(true)
    setIsStreaming(true)
    sseBufferRef.current = ''
    readLengthRef.current = 0    

    // 사용자가 '취소' 를 누르면 contoller.abort() 를 호출해 요청을 중단시킬거다.
    // AbortController 는 진행중인 axios 요청을 취소하기 위한 브라우저 내장 API
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await api.post(
        '/api/analyze',
        { company_name: companyName },
        {
          signal: controller.signal,   // AbortController 와 연결해 취소 가능하게 함.
          responseType: 'text',     // 응답은 텍스트로 받음 (SSE 텍스트르 직접 파싱하기 위해)

          // axios는 fetch의 ReadableStream처럼 청크 단위로 직접 읽는 API를 제공하지 않으므로,
          // XHR의 onDownloadProgress(다운로드 진행 중 주기적으로 호출됨)를 이용해
          // "지금까지 받은 전체 응답 텍스트"에서 "이전에 읽은 길이"만큼을 잘라내
          // 새로 도착한 부분만 추출하는 방식으로 스트리밍을 흉내낸다.          
          onDownloadProgress: (progressEvent) => {
            const xhr = progressEvent.event?.target;   // XMLHttpRequest 객체
            if(!xhr) return;
            const fullText = xhr.responseText || '';  // 지금까지 누적 수신된 전체 응답 본문
            const newChunk = fullText.slice(readLengthRef.current)  // 이번에 새로 추가된 부분만 추출
            readLengthRef.current = fullText.length;  // 다음 비교를 위해 현재까지 읽은 길이를 갱신
            if(newChunk) handleSseChunk(newChunk);
          },
        }
      )
    } catch(err) {
      if(axios.isCancel(err) || err.code === "ERR_CANCELLED") {
        // 사용자가 직접 취소 버튼을 눌러 AbortController.abort() 호출 한 경우
        setStatusText('사용자가 분석을 취소했습니다');
      } else {
        // 네트워크 오류, 서버 문제, 등의 오류
        setError(`스트리밍 중 오류가 발생했습니다: ${err.message}`)
      }
    } finally {
      // 성공 / 취소 / 실패..  이든   로딩/스트리밍 상태를 해체하고 controler 참조 정리
      setIsLoading(false)
      setIsStreaming(false)
      abortControllerRef.current = null      
    }
  }

  // "취소" 버튼 클릭 핸들러.  현재 진행중인 axios 요청 중단.
  const handleCancel = () => {
    abortControllerRef.current?.abort();
  }

  return (
    <Container className="home-page py-5">
      <h1 className="mb-4 text-center">LangChain Agent 기업 분석</h1>

      {/* 회사명 입력 + 분석시작/취소 버튼을 담은 폼 컴포넌트 */}
      <PromptForm
        companyName={companyName}
        onCompanyNameChange={setCompanyName}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isBusy={isStreaming}
      />

      {/* 분석 결과(또는 로딩/에러/안내 문구)를 보여주는 카드 영역 */}
      <Card className="result-card mt-4">
        <Card.Body>
          <StreamingResult
            content={content}
            isLoading={isLoading}
            error={error}
            statusText={statusText}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomePage;