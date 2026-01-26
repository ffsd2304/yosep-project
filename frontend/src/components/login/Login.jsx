import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. 상단에 import
import api from '../../api/axios'; // 만든 파일을 import
import { useModal } from '../../context/ModalContext';


const Login = () => {
    const navigate = useNavigate(); // 2. navigate 함수 생성
    const { openModal } = useModal();
    const [termsNoti , setTermsNoti] = useState(null);
    const [termsCheck, setTermsCheck] = useState(false);
    // 1. 아이디와 비밀번호를 하나의 객체로 관리합니다.

    // [추가] 이미 로그인된 상태라면 로그인 페이지 접근 차단
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            navigate('/store/main', { replace: true });
        }
    }, [navigate]);

    const [loginForm, setLoginForm] = useState({
        userId: '',
        userPw: ''
    });

    // 2. 통합 핸들러 함수 하나만 만듭니다!
    const handleInputChange = (e) => {
        // e.target에서 name과 value를 꺼냅니다.
        const { name, value } = e.target;

        // 기존 객체값은 유지하면서([prev]), 바뀐 name의 값만 덮어씌웁니다.
        setLoginForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckChange = (e) =>{
        setTermsCheck(e.target.checked);
    }

    // 로그인 실행 함수
    const loginSubmit = async () => {
        try {
            // 3. 백엔드 API 호출
            const response = await api.post('/api/member/login', loginForm);

            // 백엔드에서 성공 시 보통 result: "success"나 사용자 정보를 보냅니다.
            if (response.data && response.data.status === 'SUCCESS') {
                console.log("로그인 성공!");
                
                // 로그인 상태 저장 (가드 로직에서 확인용)
                sessionStorage.setItem('isLoggedIn', 'true');

                // 4. 메인 페이지로 이동 (예: /main 또는 /dashboard)
                // replace: true를 주면 뒤로가기로 다시 로그인 페이지에 못 오게 합니다.
                navigate('/store/main', { replace: true });
                
            } else {
                // 로그인 실패 처리 (아이디/비번 불일치 등)
                openModal("로그인 실패", "아이디 또는 비밀번호를 확인해 주세요.");
            }
        } catch (err) {
            // 5. 서버 에러 발생 시 처리
            console.error("Login Error:", err);
            const errMsg = err.response?.data?.message || "서버 통신 중 오류가 발생했습니다.";
            openModal("오류", errMsg);
        }
    };

    const isFormValid = 
        loginForm.userId.trim().length > 0 &&  // 아이디가 빈값이 아님
        loginForm.userPw.trim().length > 0 &&  // 비밀번호가 빈값이 아님
        termsCheck;                            // 체크박스가 true임


    const openModalPopup = async function(){
        if(termsNoti){
            openModal(termsNoti.termTitle, termsNoti.termContent, ()=>{setTermsCheck(true)});
            return;
        }
        const content = await getTermsNoti();
        if(content){
            openModal(content.termTitle, content.termContent, ()=>{setTermsCheck(true)});
        }
    }

    const getTermsNoti = async () => {
        try {
            // ✅ POST 메서드 사용, 두 번째 인자에 객체 전달
            const response = await api.post('/api/terms/terms', {
                termCatSeq: 'C000000001' 
            });
            setTermsNoti(response.data);
            return response.data;
        } catch (err) {
            console.error("에러 발생 시 응답:", err.response?.data); // 에러 시 찍히는 내용 확인
        }
    };

    return (
        <div className="login-container">
            {/* 1. 헤더 영역 */}
            <div className="login-header">
                <div className="brand-logo">Yosep Service</div>
                {/* 닫기 버튼 */}
                <button className="btn-close">✕</button>
            </div>

            {/* 2. 입력 폼 영역 */}
            <div className="login-form">
                <input 
                    type="text" 
                    className="input-field" 
                    name="userId"
                    placeholder="아이디를 입력해 주세요" 
                    maxLength={20}
                    value={loginForm.userId}
                    onChange={handleInputChange}
                />
                <input 
                    type="password" 
                    className="input-field" 
                    name="userPw"
                    placeholder="비밀번호" 
                    maxLength={20}
                    value={loginForm.userPw}
                    onChange={handleInputChange}
                />
            </div>

            {/* 3. 링크 및 체크박스 영역 */}
            <div className="link-group">
                <div className="checkbox-group">
                    <label>
                        <input 
                            type="checkbox" 
                            id="checkPrivacy"
                            checked = {termsCheck}
                            onChange={handleCheckChange}
                        />
                        <span className="custom-check"></span>
                    </label>
                    <a href="#" className="text-link" 
                        onClick={(e) => {
                        e.preventDefault(); // 👈 이 코드를 반드시 넣어주세요!
                        openModalPopup();
                    }}>
                        개인정보 수집이용 동의
                    </a>
                </div>
                <a href="#" className="text-link">
                    회원가입
                </a>
            </div>

            {/* 4. 로그인 버튼 */}
            <button 
                className={`btn-primary ${isFormValid ? 'active' : ''}`}
                id="btnLogin"
                disabled={!isFormValid}
                onClick={loginSubmit}
            >
                로그인
            </button>
        </div>
    );
};

export default Login;