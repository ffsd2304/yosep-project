import { useNavigate } from 'react-router-dom';
import '../../assets/css/CommonHeader.css';
import { useHeader } from '../../context/HeaderContext'; // 방금 만든 훅 import

// 더 이상 props({ title, showBack })를 받지 않습니다!
const CommonHeader = () => {
    const navigate = useNavigate();
    
    // ★ Context에서 현재 설정된 제목과 뒤로가기 설정을 꺼내옵니다.
    const { headerConfig } = useHeader(); 
    const { title, showBack } = headerConfig;

    const handleMenuClick = () => {
        if (window.Android && window.Android.openNativeMenu) {
            window.Android.openNativeMenu();
        } else {
            alert("네이티브 앱이 아닙니다.");
        }
    };

    return (
        <header className="common-header">
            <div className="header-left" onClick={() => navigate(-1)}>
                {showBack && <span className="icon-back">〈</span>}
            </div>

            <div className="header-center">
                <h1 className="header-title">{title}</h1>
            </div>

            <div className="header-right" onClick={() => handleMenuClick()}>
                <div className="hamburger-menu">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
        </header>
    );
};

export default CommonHeader;