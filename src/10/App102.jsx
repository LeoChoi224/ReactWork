import styled from 'styled-components';
import { Title2 } from './components/MyCSS';


const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`;

const t = {
  fontSize: "1.5em",
  textAlign: "center",
  color: "palevioletred",
}


const App102 = () => {
  return (
    <>
      <Title>장희준</Title>
      <h1 style={t}>이민재</h1>
      <Title2>김수림</Title2>
    </>
  );
};

export default App102;