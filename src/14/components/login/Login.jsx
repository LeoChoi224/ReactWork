import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledLoginDiv = styled.div`
    padding: 30px 0 30px 0;
    background-color: beige;
`;

const Login = () => {

  const navigate = useNavigate();

  return (
    <StyledLoginDiv>
      <h1>로그인 페이지입니다</h1>
      <button onClick={() => navigate(-1)}>go back</button>
    </StyledLoginDiv>
  );
};


export default Login;