import axios from 'axios';

// Axios 인스턴스 기본 설정 객체 생성
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/files',
  timeout: 5000,  // 5초 초과시 타임아웃 오류.
  headers: {
    'Accept': 'application/json',  // 서버로부터 이 타입의 응답만 허용.
  }
});

export default api;