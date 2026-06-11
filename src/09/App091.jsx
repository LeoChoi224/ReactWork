/* eslint-disable react-hooks/immutability */
/* eslint-disable no-unused-vars */

import { createRef, useRef, useState } from 'react';

/**
 * useRef()
 *   https://react.dev/reference/react/useRef
 *    렌더링 에 필요하지 않은 값에 대한 참조를 위한 hook
 *    useRef is a React Hook that lets you reference a value that’s not needed for rendering.
 *   주로, dom 을 변경할때 사용  ()
 * 
 *   const ref = useRef(initialValue)
 */


const App091 = () => {

  const myRef = useRef(null);

  const [list, setList] = useState([
    { id: 1, name: '최홍묵' },
    { id: 2, name: '홍무기' },
  ]);
  
  // Ref 의 배열 생성
  //   createRef() 사용 -> '동적' 으로 Ref 생성
  const myRefs = list.map(() => createRef())

  return (
    <>
      <div ref={myRef}>박스</div>
      <button onClick={() => {
        // console.log(myRef);
        console.log('✨', myRef.current);  // 참조하는 DOM 객체
        myRef.current.style.backgroundColor = 'yellow';
        myRefs[0].current.style.backgroundColor = 'cyan';
      }}>색 변경</button>
      <hr />
      <ul>
        {list.map( (user, index) => <li ref={myRefs[index]}>{user.name} </li>)}
      </ul>
    </>
  );
};

export default App091;