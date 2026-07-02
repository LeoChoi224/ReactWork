import { Button, Form, InputGroup } from 'react-bootstrap'

// 회사명을 입력받아 분석을 시작/취소하는 폼 컴포넌트.
// props:
//   companyName        : 입력창에 표시할 현재 값 (상위 컴포넌트의 state)
//   onCompanyNameChange: 입력값이 바뀔 때마다 상위로 변경 사항을 알리는 콜백
//   onSubmit           : 폼 제출(분석 시작) 시 실행할 콜백
//   onCancel           : 분석 진행 중 취소 버튼 클릭 시 실행할 콜백
//   isBusy             : 현재 분석(스트리밍)이 진행 중인지 여부 -> 버튼/입력창 상태 전환에 사용

const PromptForm = ({ companyName, onCompanyNameChange, onSubmit, onCancel, isBusy }) => {
  return (
    <Form onSubmit={onSubmit}>
      <InputGroup size="lg">
        <Form.Control
          type="text"
          placeholder="분석할 회사명을 입력하세요 (예: Apple, Tesla, Samsung)"
          value={companyName}
          onChange={(e) => onCompanyNameChange(e.target.value)}
          // 분석이 진행 중일 때는 입력창을 잠가 회사명을 바꿀 수 없게 한다.
          disabled={isBusy}
        />
        {isBusy ? (
          // 분석 진행 중에는 "취소" 버튼을 보여준다 (type="button"이라 폼 submit을 유발하지 않음).
          <Button
            type="button"
            variant="danger"
            onClick={(e) => {
              // 같은 위치의 버튼이 submit 타입으로 리렌더링되기 전에 클릭의 기본 동작(form submit)을 확실히 막는다.
              e.preventDefault()
              onCancel()
            }}
          >
            취소
          </Button>
        ) : (
          // 평소(대기 상태)에는 "분석 시작" 버튼을 보여준다.
          // 입력값이 비어있으면(trim 후 빈 문자열) 버튼을 비활성화해 빈 요청을 막는다.
          <Button variant="primary" type="submit" disabled={!companyName.trim()}>
            분석 시작
          </Button>
        )}
      </InputGroup>
    </Form>
  );
};

export default PromptForm;