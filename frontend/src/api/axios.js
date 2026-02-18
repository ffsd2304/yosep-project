import axios from 'axios';

const api = axios.create({
    // 여기가 바로 contextRoot 역할을 합니다!
    
    baseURL: import.meta.env.VITE_API_BASE_URL, 
    timeout: 5000, // 5초 이상 응답 없으면 중단
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // 세션 만료 시 클라이언트의 로그인 상태를 초기화하여 무한 루프를 방지합니다.
            sessionStorage.removeItem('isLoggedIn');

            // 현재 주소가 '/login'이 아닐 때만 경고창을 띄우고 이동시킴
            if (!window.location.pathname.includes('/store/login')) {
                alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
                window.location.href = '/store/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;