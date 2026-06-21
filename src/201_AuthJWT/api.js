import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8000',
});

// 2. Axios Request Interceptor (요청 가로채기 파이프라인) 설정
// ✨ Axios 인터셉터를 사용하여 로컬 스토리지에 JWT 토큰이 있을 경우, 요청 헤더에 자동으로 주입합니다.
// 매번 개별 비동기 API 통신을 날릴 때마다 수동으로 토큰을 심어주는 수고를 덜고, 
// 로컬 스토리지에 토큰이 포착될 경우 자동으로 'Authorization Bearer 토큰값' 헤더를 주입해 줍니다.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // 띄어쓰기!
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;