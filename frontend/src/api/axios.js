import axios from 'axios';

const api = axios.create({
    // 여기가 바로 contextRoot 역할을 합니다!
    
    //baseURL: 'http://10.0.2.2:8080',  // 앱 로컬 테스트용
    baseURL: 'http://localhost:8080', 
    //baseURL: 'http://136.118.142.58:8080', 
    timeout: 5000, // 5초 이상 응답 없으면 중단
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // 현재 주소가 '/login'이 아닐 때만 경고창을 띄우고 이동시킴
            if (!window.location.pathname.includes('/login')) {
                alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;