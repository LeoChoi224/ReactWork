import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserOnly1 from './pages/UserOnly1';
import UserOnly2 from './pages/UserOnly2';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App201() {
  return (
    <Router>
      <Routes>
        {/* 공개적인 퍼블릭 접근 허용 라우트 구역 */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 회원용 프라이빗 비공개 접근 격리 구역 */}
        {/* ProtectedRoute 가드로 자식을 감싸 유효한 토큰 인증을 통과한 회원만 렌더링되게 통제합니다. */}
        {/* 회원 전용 공간 1 */}
        <Route 
          path="/user-only1" 
          element={
            <ProtectedRoute>
              <UserOnly1 />
            </ProtectedRoute>
          } 
        />

        {/* 회원 전용 공간 2 */}
        <Route 
          path="/user-only2" 
          element={
            <ProtectedRoute>
              <UserOnly2 />            
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App201;