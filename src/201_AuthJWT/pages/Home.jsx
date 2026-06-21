/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { Container, Button, Card, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Home = () => {
  const [user, setUser] = useState(null);  // 로그인 상태 유저 정보 저장 공간
  const [loading, setLoading] = useState(true); // 통신 대기 상태 스피너 핸들러
  const navigate = useNavigate();
  
  // 로컬 스토리지에 토큰이 있는지 확인하여 로그인 여부 체크
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      api.get('/api/me')
        .then(response => {
          setUser(response.data);   // 로그인 성공시 응답받은 User 정보 세팅
          setLoading(false);
        })
        .catch(() => {
          // 토큰만료, 혹은 비정상적인 토큰이라면, 삭제후, 로그아웃 처리
          localStorage.removeItem('token');
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

  }, [token]);  // token 값에 의존

  // 로그아웃 핸들러 함수
  const handleLogout = () => {
    // 브라우저 스토리지에서 토큰 파기
    localStorage.removeItem('token')
    
    // 메모리 상태 리셋
    setUser(null);
    
    // 메인 리다이렉트
    navigate('/');
  };

  // 로딩중 화면
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );    
  }

  return (
    <Container className="text-center mt-5" style={{ maxWidth: '600px' }}>
      <h1>웰컴! 메인 페이지 🏠</h1>
      <p className="lead mt-3">이 페이지는 로그인 없이 누구나 볼 수 있습니다.</p>

      {/* 로그인 상태에 따른 조건부 렌더링 */}
      {user ? (
        // 1. 로그인 된 경우: 회원 정보 및 로그아웃 버튼 표시
        <Card className="mt-4 shadow-sm text-start">
          <Card.Body>
            <Card.Title className="fs-4 mb-3 text-center">🎉 현재 로그인 정보</Card.Title>
            <Card.Text><strong>아이디:</strong> {user.username}</Card.Text>
            <Card.Text><strong>이름:</strong> {user.name}</Card.Text>
            <Card.Text><strong>이메일:</strong> {user.email || '없슴'}</Card.Text>
            <hr />
            <div className="d-flex justify-content-between">
              <Button variant="danger" onClick={handleLogout}>로그아웃</Button>
              <div>
                <Link to="/user-only1" className="me-2"><Button variant="primary">전용방 1</Button></Link>
                <Link to="/user-only2"><Button variant="success">전용방 2</Button></Link>
              </div>
            </div>
          </Card.Body>
        </Card>
      ) : (
        // 2. 로그인 안 된 경우: 로그인/회원가입 버튼 표시
        <div className="mt-4">
          <Link to="/login"><Button variant="primary" className="me-2">로그인</Button></Link>
          <Link to="/register"><Button variant="outline-primary" className="me-2">회원가입</Button></Link>
          <Link to="/user-only1"><Button variant="secondary" className="me-2">회원 전용1</Button></Link>
          <Link to="/user-only2"><Button variant="secondary">회원 전용2</Button></Link>
        </div>
      )}
    </Container>
  );
};

export default Home;