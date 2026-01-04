import { useState } from 'react';
import '../../assets/css/style.css';
import { useModal } from '../../context/ModalContext'; // 방송국 연결 (경로 확인!)
const Login = () => {

    const { openModal } = useModal();

    // 1. 상태 관리 (사용자 입력값)
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);

    // 2. 버튼 활성화 여부 계산 (아이디, 비번 있고 & 약관 동의했을 때만 true)
    const isButtonActive = userId.trim() !== '' && userPw.trim() !== '' && isAgreed;

    // 3. 이벤트 핸들러 (껍데기만 만들어둠)
    const handlePrivacyClick = (e) => {
        e.preventDefault(); // 링크 이동 방지
        console.log("개인정보 약관 팝업 열기 로직이 들어갈 곳");
        // 나중에 여기서 Modal 컴포넌트를 true로 바꾸면 됩니다.
    };

    const handleJoinClick = (e) => {
        e.preventDefault();
        console.log("회원가입 페이지로 이동하는 로직");
    };

    const handleLogin = () => {
        if (!isButtonActive) return;
        console.log("로그인 API 호출 로직이 들어갈 곳", { userId, userPw });
        // 나중에 fetch('/api/login', ...) 코드를 여기에 넣으면 됩니다.
    };

    return (
        <div className="login-container">
            {/* 헤더 영역 */}
            <div className="login-header">
                <div className="brand-logo">Yosep Service</div>
                <button className="btn-close" onClick={() => console.log("닫기")}>✕</button>
            </div>

            {/* 입력 폼 영역 */}
            <div className="login-form">
                <input 
                    type="text" 
                    className="input-field" 
                    placeholder="아이디를 입력해 주세요" 
                    maxLength={20}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input 
                    type="password" 
                    className="input-field" 
                    placeholder="비밀번호" 
                    maxLength={20}
                    value={userPw}
                    onChange={(e) => setUserPw(e.target.value)}
                />
            </div>

            {/* 링크 및 체크박스 영역 */}
            <div className="link-group">
                <div className="checkbox-group">
                    <label>
                        {/* 리액트에서는 checked 속성으로 제어합니다 */}
                        <input 
                            type="checkbox" 
                            id="checkPrivacy"
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                        />
                        <span className="custom-check"></span>
                    </label>
                    <a href="#" className="text-link" onClick={handlePrivacyClick}>
                        개인정보 수집이용 동의
                    </a>
                </div>
                <a href="#" className="text-link" onClick={handleJoinClick}>
                    회원가입
                </a>
            </div>

            {/* 로그인 버튼 */}
            {/* 조건부 클래스 부여: 활성화되면 'active' 클래스 추가 */}
            <button 
                className={`btn-primary ${isButtonActive ? 'active' : ''}`} 
                id="btnLogin"
                disabled={!isButtonActive}
                onClick={handleLogin}
            >
                로그인
            </button>
        </div>
    );
};

export default Login;