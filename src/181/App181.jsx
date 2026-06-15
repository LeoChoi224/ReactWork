import { useState } from "react";
import Top from './components/Top';
import Bottom from './components/Bottom';

const App181 = () => {
  const [number, setNumber] = useState(1);
  const addNumber = () => {
    setNumber(number + 1);
  }

  return (
    <div className='container'>
      <h2>최상위 화면</h2>
      <Top number={number} />
      <Bottom addNumber={addNumber}/> 
    </div>
  );
};

export default App181;