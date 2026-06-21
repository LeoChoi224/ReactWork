/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
  // 양식 폼 입력 데이터 실시간 리액트 상태 바인딩 객체
  const [formData, setFormData] = useState({ username: '', password: '', name: '', email: '' });
  const [error, setError] = useState(''); // 백엔드 검증 실패 메시지 바인딩용
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 전송 데이터 가공: email이 빈 문자열이면 null로 처리  (email 검증 확실하게 하기 위해)

    // 백엔드 Pydantic EmailStr 유효성 에러(422) 방지를 위한 가공 레이어입니다.
    // 만약 사용자가 이메일 폼을 입력하지 않아 공백문자 형태라면 완벽한 null 객체로 승격시켜 전송합니다.
    const requestData = {
      ...formData,
      email: formData.email.trim() === "" ? null : formData.email
    };

    // 회원가입 전송
    try {
      await api.post('/api/register', formData);
      alert('회원 가입 성공!  로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch(err) {
      setError(err.response?.data?.detail || '회원가입에 실패했습니다');
    }

  };

  return (
    <Container style={{ maxWidth: '500px' }} className="mt-5">
      <h2 className="mb-4 text-center">회원가입</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>아이디 (Username)</Form.Label>
          <Form.Control type="text" required onChange={e => setFormData({...formData, username: e.target.value})} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" required onChange={e => setFormData({...formData, password: e.target.value})} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" required onChange={e => setFormData({...formData, name: e.target.value})} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>이메일 (선택)</Form.Label>
          <Form.Control type="email" onChange={e => setFormData({...formData, email: e.target.value || null})} />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">가입하기</Button>
      </Form>
    </Container>
  );
};

export default Register;