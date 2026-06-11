/* eslint-disable no-unassigned-vars */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// 변수 선언은 let, const 로만 해야 함  (var 사용하지 말기!)
// JSX 네 { .. }  인에 유효한 JavaScript 표현식 사용 가능 
//    https://ko.legacy.reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx
// JSX 안에선 if 사용 불가.  삼항연산자 가능.


// 스타일링 하는 방법 (CSS)
// 방법1: 내부에 적는 방법
// 방법2: 외부 파일에 작성
// 방법3: 라이브러리 사용 (ex: 부트스트랩, component-styled)


let a = 10;
const b = 20;

// 화면이 그려질때마다 App() 함수가 실행되고 리턴된다 -> 그려진다
function App() {
  const [count, setCount] = useState(0)

  let c;
  console.log(`c=${c}`);

  // 스타일 object
  const mystyle = {
    color: "red",
  };

  // JSX 는 '한개의 element 만' 리턴 가능하다! 
  return (
    <>
      {/*
        JSX 주석
        여러줄 가능
      */}
      <div>안녕하세요? {a}+{b} = {a + b}</div>
      <div>{a === b ? "같다" : "다르다"}</div>
      {/* 조건부 렌더링, SCE 사용 */}
      <h1>해당태크 {b === 20 && '20입니다'}</h1>

      <div style={mystyle}>안녕</div>
      <div style={{ color: 'blue' }}>안녕</div>
      {/* JSX 에서는 class 사용하지 말고 className 사용 */}
      <div className="box-style">안녕3</div>
    </>
  )
}

export default App
