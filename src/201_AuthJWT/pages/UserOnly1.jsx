/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const UserOnly1 = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    // API 인스턴스 인터셉터에 의해 요청 시 공통 헤더에 세션 토큰이 탑재되어 안전하게 접근 인가를 요청합니다.    
    // 🔷TODO
  }, [     ]);

  const handleLogout = () => {
    // 🔷TODO
  };

  // 백엔드 통신 상태를 자연스럽게 표현하기 위한 예외적 컴포넌트 렌더링 배정 레이어
  // 🔷TODO

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <Card className="shadow-sm border-primary">
        <Card.Body>
          <Card.Title className="fs-3 mb-3 text-primary">🔒 회원 전용 공간 - 1번 비밀방</Card.Title>
          <Card.Text><strong>안녕하세요, {"🔷TODO"}님!</strong> (ID: {"🔷TODO"})</Card.Text>
          <hr />
          <div className="d-flex justify-content-between">
            <Link to="/"><Button variant="secondary">홈으로</Button></Link>
            <Link to="/user-only2"><Button variant="success">2번 방 구경가기</Button></Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserOnly1;