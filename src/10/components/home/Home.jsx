import styled from "styled-components";

// props 받기
const Home = (props) => {
  console.log('😀', props); // 확인

  const { boards, setBoards, id } = props;
  const { number, setNumber } = props;
  const { userinfo } = props;

  console.log('🐶 boards:', boards);  // 확인
  console.log('🐹 id:', id);  // 확인

  // styled component 에 JS 표현식 사용 가능!
  const color1 = 'cyan';
  const StyledButton1 = styled.button`
    color: orangered;
    background-color: ${color1};
    border-style: ${(color1 === 'cyan') ? 'dashed' : 'none'};
  `;

  const StyledButton2 = styled.button`
    margin: 0 5px;
    background-color: ${props => props.bgColor};  /* 함수를 표현식에 사용 */
  `;

  // 부모로부터 받은 데이터로 조건부 스타일링
  const StyledButton3 = styled.button`
    color: ${props => props.u.username === '최홍목' ? 'blue' : 'red'};
  `;

  // styled component 상속
  const StyledButton4 = styled(StyledButton2)`
    border: 2px dotted hotpink;
  `;

  return (
    <div>
      <h1>홈페이지</h1>
      <button onClick={() => setBoards([])}>전체삭제</button>
      {boards.map(board =>
        <h4>제목: {board.title} 내용: {board.content}</h4>)}

      <hr />
      <h2>number {number}</h2>
      <button onClick={() => setNumber(number + 1)}>증가</button>

      <hr />
      <StyledButton1>버튼1</StyledButton1>
      <StyledButton2 bgColor='limegreen'>버튼2</StyledButton2>
      <StyledButton2 bgColor='orangered'>버튼2-2</StyledButton2>
      <StyledButton3 u = {userinfo}>버튼3</StyledButton3>
      <StyledButton4 bgColor='yellow'>버튼4</StyledButton4>
    </div>
  );
};

export default Home;