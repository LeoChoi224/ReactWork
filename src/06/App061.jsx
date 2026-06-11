import { useState } from "react";
import Sub from "./Sub";

// hook : react 의 상태관리등 다양한 기능을 활용할수 있도록 제공되는 함수(기능)
//      ※ React 16.8 부터 도입.   그 이전에는 class component 로 작성하였었다.

// hook 함수호출 규칙 2가지
//    ① React 함수 안에서만 호출  (React function component 안에서만 호출)
//    ② top level 에서만 호출 가능
//      - 조건문(if) 안에서 안되요!
//      - 반복문(for, while) 안에서 안되요!
//      - 중첩함수 안에서 안되요!
//      - early return 뒤에서 안되요


// Responding to Events
// https://react.dev/learn/responding-to-events#adding-event-handlers

/**
 *  useState()
 *   React Hook 라이브러리 함수중 하나
 *   component 에 state variable (상태변수) 추가
 * 
 *   const [state, setState] = useState(initialState);
 * 
 *      state: 상태값
 *      setState : 상태값을 변경할 함수
 *      initialState : 상태값의 초깃값.
 * 
 *   component 는 상태값이 변경되면 다시 그린다 (함수호출&리턴)
 */


function App061() {
  console.log("🟦 App061() 호출");

  // let number = 1;   // 이건 '상태값' 이 아니다
  const [number, setNumber] = useState(1);  // component 상태값 설정
  // number 라는 상태변수가 선언되고,  1 로 초기화 된다.
  // 이를 변경하려면 setNumber() 함수를 사용해야 한다


  const add = () => {
    // number++;    // 불가!
    setNumber(number + 1);  // setNumber는 React 에게 number 값 변경을 요청.
                            // 이렇게 상태변수를 변화시켜야 return 이 된다.
    console.log('🐹add: ', number);
  };

  return (
    <>
      <div>
        <h1>숫자: {number}</h1>
        <button onClick={add}>더하기</button>
        <Sub/>
      </div>
    </>
  )
}

export default App061;