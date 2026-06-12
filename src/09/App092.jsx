/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import Box1 from './Box1';
import Box2 from './Box2';
Box2
/**
 * 메모이제이션(memoization)은
 * 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써
 * 동일한 계산의 '반복 수행을 제거'하여 프로그램 실행 속도를 빠르게 하는 기술이다.
 * 동적 계획법의 핵심이 되는 기술이다
 */

/**
 * useCallback 또한 메모이제이션(memoization) 기법으로 
 * 컴포넌트 '성능을 최적화' 시켜주는 도구로 사용된다.
 *
 *  const cachedFn = useCallback(fn, dependencies)
 * 
 *  useMemo vs. useCallback
 *    useMemo 는 인자로 넘겨준 '콜백함수가 리턴하는 값'을 메모이제이션
 *    useCallback 는 인자로 넘겨준 '콜백함수 자체' 를 메모이제이션 
 */

const App092 = () => {
  const [number, setNumber] = useState(0);

  // number 에 어떤숫자가 들어있는지 콘솔에서 확인만 해주는 '함수'
  const A_function = () => {
    console.log(`📌 A_function 호출 number : ${number}`);
    return;
  };

  useEffect(() => {
    console.log('🟡 useEffect: A_function 이 변경(재정의)되었습니다.');
  }, [A_function]);
  // 숫자만 바꾸는 데도 위 useEffect 의 콜백이 실행된다. <- A_fucntion 도 재정의 되었으니까!

  /*******************************************************************************
   * 이제 useCallback을 사용해서 App 컴포넌트가 렌더링이 되더라도 
   * function이 바뀌지 않도록 (재정의 되지 않도록) 해보자
   */

  const B_function = useCallback(() => {
    console.log(`🤖 B_function 호출 number : ${number}`);
    return;
  }, []);
  // 의존성 배열에 아무것도 넣어주지 않았으니까
  // B_function 안의 함수는
  // App 컴포넌트가 렌더링이 될 때 만들어져서 메모이제이션이 될 것이다.

  // 그 다음 렌더링부터는 더 이상 함수 객체를 새로 생성해서 할당하는 것이 아니라
  // 이미 가지고 있던 메모이제이션 된 주소를 B_function 이 가지고 있으면서 재사용하는 것이다.

  // ↓아무리 App 컴포넌트가 렌더링이 되더라도 useEffect는 불리지 않을 것이다.
  useEffect(() => {
    console.log(`🔵 useEffect: B_function 이 변경(재정의) 되었습니다`);
  }, [B_function]);


  // *********************************************************
  // ↓ number 가 업데이트될 때마다 메모이제이션된 함수도 업데이트해주고 싶으면 
  // 두 번째 의존성 배열에 number를 넣어준다.
  const C_function = useCallback(() => {
    console.log(`🔑 C_function 콜백호출 number : ${number}`);
    return;
  }, [number]); // 🔑 <-- number 추가 ★

  useEffect(() => {
    console.log('🟠 useEffect: C_function 이 변경(재정의)되었습니다.');
  }, [C_function]);


  // ************************************************************
  const [toggle, setToggle] = useState(true);

  /**************************************************************
     *  🎃 활용예제 : 
     *     size 값을 변경시킬때마다 크기가 변경되는 사각형 그리기.
     *   
     *  Box1.jsx 부터 작성
     * 
     */
  const [size, setSizes] = useState(100);
  const createBoxStyle = () => {
    return {
      backgroundColor: "pink",
      width: `${size}px`,
      height: `${size}px`,
    };
  };
  // ↑ 박스의 크기를 키우면 콘솔에 '🎃 박스 키우기'가 콘솔에 찍히는 것을 확인할 수 있다.

  // 왜냐하면 App 컴포넌트 안에서 size를 변경시켜주면 App 컴포넌트가 랜더링이되고 
  // 변수가 초기화되면서 createBoxStyle도 초기화되기 때문에 
  // 다시 새로 할당된 함수 객체의 주소를 가지고 있게 된다.

  // 그리고 createBoxStyle 함수는 Box 컴포넌트로 전달이 되니까 
  // Box 컴포넌트 안의 useEffect 안의 createBoxStyle 이 바뀌었다고 인식을 한다. 

  /*******************************************************************************
   * 🥎 App 컴포넌트에 state를 하나 더 추가해보자.
  */
  const [isDark, setIsDark] = useState(false);
  // ↑ size를 바꾸면 '🎃 박스 키우기' 호출된다.
  // - 그런데 Chagne Theme 을 눌러도 '🎃 박스 키우기' 호출된다.

  // Q. Theme 를 바꾸는 것은 박스가 커지는 것과 관련이 전혀 없는데? 왜 useEffect가 불리는 것일까?
  // 이유는 isDark가 변화가 있으니까 다시 렌더링이 되면서 createBoxStyle이 초기화되어서 그렇다.

  /******************************************************************************
   * 🎨 이것을 막아주려면 createBoxStyle이 사이즈가 바뀌었을 때만 초기화 되도록! => useCallback를 쓰면 되다
   * 
   *  Box2.jsx 부터 만듭니다 <-- Box1 으로부터 복사한뒤 수정
   * 
   *  ↓ createBoxStyle2 을 useCallback() 으로 감싸주고 의존성 배열에는 size 넣어주자.
   * 
  */
  const createBoxStyle2 = useCallback(() => {
    return {
      backgroundColor: "pink",
      width: `${size}px`,
      height: `${size}px`,
    };
  }, [size]);


  return (
    <div>
      <input
        type='number'
        value={number}
        onChange={e => setNumber(e.target.value)}
      /><br />
      <button onClick={A_function}>A_function() 호출</button><br />
      <button onClick={B_function}>B_function() 호출</button><br />
      <button onClick={C_function}>C_function() 호출</button><br />

      <hr />
      <button onClick={() => setToggle(!toggle)}>{toggle.toString()}</button>

      {/* 🎃 예제 */}
      <hr />
      <input
        type="number"
        value={size}
        onChange={e => setSizes(e.target.value)}
      />

      <Box1 createBoxStyle={createBoxStyle}></Box1>

      {/* 🥎 예제 */}
      <div style={{
        background: isDark ? "black" : "white",
      }}>
        <button onClick={() => setIsDark(!isDark)}>Change Theme</button>
      </div>
      
      <hr/>
      {/* 🎨 예제 */}
      <Box2 createBoxStyle={createBoxStyle2}></Box2>      

    </div>
  );
};

export default App092;