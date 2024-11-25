import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

// 토큰 인터셉터 설정
apiClient.interceptors.request.use((config) => {
  if (config.url !== '/auth/login' && config.url !== '/auth/register') {
    const token = sessionStorage.getItem('access_token');
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
