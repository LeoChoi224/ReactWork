import styled from "styled-components";

// styled-component 변수명 작명시..
// 가급적 다른 component 와 구분될수 있게 작명. 권장.

const StyledLoginDiv = styled.div`
    padding: 30px 0 30px 0;  /* CSS 주석 ok */
    background-color: beige;
`;

const Login = () => {
  return (
    <StyledLoginDiv>
      <h1>로그인 페이지 입니다</h1>
    </StyledLoginDiv>
  );
};

export default Login;