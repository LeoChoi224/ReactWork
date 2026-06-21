/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 성공 시, location.state에 저장된 이전 목적지(from)가 있다면 그곳으로 보내고, 없다면 기본 페이지인 메인으로 이동시킵니다.
  // ProtectedRoute에서 넘겨준 가려고 했던 주소(from)가 있다면 추출하고, 없다면 메인('/')을 기본값으로 설정합니다.
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();

    // FastAPI의 OAuth2PasswordRequestForm 스펙과 완벽하게 정합을 맞추기 위해,
    // JSON 형태가 아닌 전용 URLSearchParams 객체를 생성하여 x-www-form-urlencoded 포맷 스트링 바디 데이터로 인코딩 전송합니다.
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    try{
      const response = await api.post('/api/login', params, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });

      // 발급 받은 JWT 토큰을 저장
      localStorage.setItem('token', response.data.access_token);

      // 로그인 성공후 원래 가고자 했던 url 로 리다이렉트 한다!
      navigate(from, {replace: true});

    } catch(err) {
      setError('아이디 혹은 비밀번호가 일치하지 않습니다');
    }


  };

  return (
    <Container style={{ maxWidth: '400px' }} className="mt-5">
      <h2 className="mb-4 text-center">로그인</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>아이디</Form.Label>
          <Form.Control type="text" required value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" required value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">로그인</Button>
      </Form>
    </Container>
  );
};

export default Login;