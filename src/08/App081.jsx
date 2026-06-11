import { useState, useMemo } from 'react';

/**
 * useMemo (memorization)
 * 
 *   https://react.dev/reference/react/useMemo
 *   React Hook that lets you cache the result of a calculation between re-renders.
 *   연산된 값을 기억
 * 
 *   const cachedValue = useMemo(calculateValue, dependencies)
 *      calculateValue: 어떤 함수를 메모(기억)할것인지
 *      dependencies: 위 함수는 언제 실행되게 할 것인지
 */

const App081 = () => {
  console.log('🟦 App081() 호출');

  const [list, setList] = useState([1, 2, 3, 4]);
  const [str, setStr] = useState("합계");

  // list 합계
  const getAddResult = () => {
    let sum = 0;
    list.forEach(i => sum += i);
    console.log("🟡getAddResult() 호출 sum =", sum);
    return sum;
  };

  const addResult = useMemo(() => getAddResult(), [list]);

  return (
    <>
      <button onClick={() => {setList([...list, 10])}}>리스트값 추가</button>
      <button onClick={() => {setStr("희준정준")}}>문자변경</button>
      {list.map(i => <div>{i} </div>)}
      <div>{str}: {addResult}</div>
    </>
  );
};

export default App081;