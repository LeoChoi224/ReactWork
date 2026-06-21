/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const UserOnly2 = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔷TODO
  }, [    ]);

  // 🔷TODO

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <Card className="shadow-sm border-success">
        <Card.Body>
          <Card.Title className="fs-3 mb-3 text-success">🔒 회원 전용 공간 - 2번 비밀방</Card.Title>
          <Card.Text>이곳은 두 번째 회원 특별 구역입니다. 가입 시간: {"🔷TODO"}</Card.Text>
          <hr />
          <div className="d-flex justify-content-between">
            <Link to="/user-only1"><Button variant="primary">1번 방으로</Button></Link>
            <Link to="/"><Button variant="secondary">홈으로</Button></Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserOnly2;