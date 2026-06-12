import { useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Page1 from "./pages/Page1";
import { UserContext } from "./context/UserContext";

/**
 *  useContext()
 *   전역 상태를 다루기 위해 제공되는 리액트의 Context API
 *   컴포넌트에서 context 를 읽고 구독할수 있게 해주는 hook
 *
 *   const value = useContext(SomeContext)
 *
 */

/**
 *
 * 1) 우선 Context 를 만들어준다.
 *    ex) createContext()
 *
 * 2) 상위 컴포넌트에서 Context를 import 시켜준다.
 *    하위 컴포너트 를 위 Context의 <Provider>로 감싸준다.
 *
 *    Context의 Provider는 value= 라는 props를 받는데
 *    이 안에 공유하고자 하는 전역 데이터를 넣어준다.
 *
 *    그러면 Context 감싸는 모든 하위 컴포넌트는
 *    props를 사용하지 않고도 value=로 넣어준 값에 접근할 수 있다.
 */

const App184 = () => {

  const [isDark, setIsDark] = useState(false);


  return (
    <>
      <UserContext.Provider>
      <ThemeContext.Provider value={{ isDark, setIsDark }}>

        <Page1 />

      </ThemeContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default App184;