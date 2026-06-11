import Beta from "./Beta";

// component 화
// component 화 하지 않으면 부분이 변경되면 화면 전체가 렌더링 된다
// 잘 component 화 해 놓으면 부분이 변경될때, 변경되는 부분만 렌더링 된다.

// 기본적으로 '부모' 가 다시 렌더링될때 '자식' 도 다시 렌더링 된다.

function App041() {
  console.log('😀App041() 호출')

  return (
    <>
      <div>App041</div>
      <Beta/>
    </>
  )
}

export default App041;    // 외부 jsx 파일에서 사용할수 있도록 export