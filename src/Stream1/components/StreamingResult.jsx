import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { Alert } from 'react-bootstrap'
import LoadingIndicator from './LoadingIndicator'

// 스트리밍되는 분석 결과(content)를 화면에 표시하는 컴포넌트.
// 4가지 상태를 우선순위대로 처리한다: 에러 -> 로딩 -> 결과 텍스트 -> 안내 문구.
// props:
//   content   : 지금까지 누적된 분석 결과 텍스트(마크다운)
//   isLoading : 첫 토큰이 도착하기 전(또는 분석 준비 중)인지 여부
//   error     : 에러 메시지 (있으면 Alert로 표시)
//   statusText: 로딩 중 보여줄 상태 문구 (예: 도구 사용 중 메시지)
const StreamingResult = ({ content, isLoading, error, statusText }) => {

  // 결과를 표시하는 영역의 DOM 참조.  새로운 글자 추가될때마다 스크롤 강제 다운.
  const scrollRef = useRef(null)

  useEffect(() => {
    // content가 갱신될 때마다(새 토큰이 추가될 때마다) 스크롤 위치를 맨 아래로 이동시켜서
    // 사용자가 항상 최신 생성 텍스트를 자동으로 따라가며 볼 수 있게 한다.        
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [content]);

  return (
    <div className="streaming-result" ref={scrollRef}>
      {/* 1) 에러가 있으면 최우선으로 빨간 경고 박스 표시 */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* 2) 로딩 중이고 아직 받은 텍스트가 없을 때만 스피너 표시
             (토큰이 하나라도 도착하면 isLoading이 false가 되어 사라짐 — HomePage의 handleSseChunk 참고) */}
      {isLoading && !content && <LoadingIndicator label={statusText} />}

      {/* 3) 누적된 텍스트가 있으면 마크다운으로 렌더링 (LLM이 마크다운 형식으로 응답하기 때문) */}
      {content && (
        <div className="markdown-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}

      {/* 4) 위 세 가지 경우에 모두 해당하지 않는 "최초 진입" 상태일 때 안내 문구 표시 */}
      {!isLoading && !content && !error && (
        <p className="placeholder-text">회사명을 입력하고 분석을 시작하세요.</p>
      )}
    </div>
  );
};

export default StreamingResult;