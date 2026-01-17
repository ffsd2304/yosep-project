// src/components/common/BottomTab.jsx
import { useNavigate,useLocation } from 'react-router-dom';
import "../../assets/css/BottomTab.css";
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const BottomTab = () => {
  const navigate = useNavigate();
  const location = useLocation(); // location 객체 필요
  const { cartItems } = useCart();

  const { toast } = useToast();
  
  const totalCount = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
  // 현재 경로 확인용 함수 (디자인 강조용)
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* --- 여기가 토스트 메시지 UI입니다 --- */}
      <div className={`toast-popup ${toast.visible ? 'active' : ''}`}>
        {toast.message}
      </div>
      {/* ---------------------------------- */}
      <nav className="bottom-tab">
        {/* 홈 */}
        <div className={`tab-item ${isActive('/store/main') ? 'active' : ''}`} onClick={() => navigate('/store/main')}>
          <div className="icon home"></div> {/* 클래스명 home 추가 */}
          <span className="label">홈</span>
        </div>
        
        {/* 장바구니 */}
        <div className={`tab-item ${isActive('/store/cart') ? 'active' : ''}`} onClick={() => navigate('/store/cart')}>
          <div className="icon-wrapper">
            <div className="icon cart"></div> {/* 클래스명 cart 추가 */}
            {totalCount > 0 && <span className="badge">{totalCount}</span>}
          </div>
          <span className="label">장바구니</span>
        </div>

        {/* 내 정보 */}
        <div className={`tab-item ${isActive('/store/mypage') ? 'active' : ''}`} onClick={() => navigate('/store/mypage')}>
          <div className="icon mypage"></div> {/* 클래스명 mypage 추가 */}
          <span className="label">내 정보</span>
        </div>
      </nav>
    </>
  );
};

export default BottomTab;