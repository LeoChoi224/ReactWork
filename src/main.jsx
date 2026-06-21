/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/**
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
 import App201 from './20/App201.jsx'  // form 에서 value, key, defaultValue, 리스트에서 key
 import App181 from './181/App181.jsx' // Redux 사용 안 한 경우. 하위 component에 데이터 전달하는 방식의 문제점
 import App182 from './182/App182.jsx' // Reducx 사용 redux toolkit
 import App184 from './184/App184.jsx' // useContext
 import BookApp from './R-Book-Frontend/BookApp.jsx'  // 백엔드 연동 R-Book 도서관리
 import RBoardApp from './R-Board-Frontend/RBoardApp.jsx'  // 백엔드 연동 R-Board 게시글 관리
 import RSurveyApp from './r-survey-client/RSurveyApp.jsx'  // 백엔드 연동 R-Survey 설문조사
 import App191 from './191/App191.jsx' // File Upload
 */
import App201 from './201_AuthJWT/App201'


createRoot(document.getElementById('root')).render(

  <App201 />

)
