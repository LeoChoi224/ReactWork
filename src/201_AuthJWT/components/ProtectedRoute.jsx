import { Navigate, useLocation } from 'react-router-dom';

// 1. 특정 비공개 및 회원전용 페이지 컴포넌트를 감싸서 접근 제어(Guard)를 수행하는 래퍼 컴포넌트입니다.
//    인증되지 않은 유저가 회원전용 페이지에 접근할 때 로그인 페이지로 리다이렉트
const ProtectedRoute = ({ children }) => {
  // 로컬 스토리지 상 토큰 흔적 추적
  const token = localStorage.getItem('token');

  // 현재 사용자가 접근을 시도한 주소 정보를 가져옵니다.
  const location = useLocation();

  // 만약 로그인 세션 토큰이 식별되지 않는 유령 유저라면 전용 페이지 렌더링을 완전히 취소(Block)하고,
  // 강제적으로 로그인 화면(/login)으로 강제 리다이렉트 처리합니다.  
  if(!token){
    return <Navigate to="/login" replace state={{ from: location}}/>;
  }

  // 합법적인 회원의 접근일 경우에만 
  // 자식 컴포넌트(UserOnly1 등)를 통과시켜 정상 화면을 띄웁니다.
  return children;
};

export default ProtectedRoute;