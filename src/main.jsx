/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'   // 앱구조, JSX기초, CSS 적용
import App041 from './04/App041.jsx'  // component
import App042 from './04/App042.jsx'  // 데이터(들) 렌더링
import App061 from './06/App061.jsx'  // useState 상태값 관리
import App062 from './06/App062.jsx'  // useState (배열 상태값)
import App071 from './07/App071.jsx'  // useEffect, import, export
import App081 from './08/App081.jsx'  // useMemo
import App091 from './09/App091.jsx'  // useRef
import App092 from './09/App092.jsx'  // useCallback
import App101 from './10/App101.jsx'  // style 적용방법 1, 2
import App102 from './10/App102.jsx'  // styled-component 로 style 적용
import App103 from './10/App103.jsx'  // page - component 구조
import App104 from './10/App104.jsx'  // props
import App141 from './14/App141.jsx'  // react-router-dom, react-bootstrap
import App152 from './152/App152.jsx' // CRUD


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App152 />
  </BrowserRouter>
  // <StrictMode>
  //   <App />
  // </StrictMode>,
)
