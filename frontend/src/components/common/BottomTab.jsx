import { useLocation, useNavigate } from 'react-router-dom';
import "../../assets/css/BottomTab.css";
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const BottomTab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { toast } = useToast();
  
  const totalCount = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
  const itemCount = cartItems.length; // 상품 종류의 갯수 (Unique Product Count)

  // ✅ URL을 보고 현재 활성화된 탭을 스스로 판단 (진실의 원천: URL)
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/store/cart')) return 'cart';
    if (path.includes('/store/mypage')) return 'mypage';
    return 'home'; // 기본값
  };
  const activeTab = getActiveTab();

  return (
    <>
      {/* --- 여기가 토스트 메시지 UI입니다 --- */}
      <div className={`toast-popup ${toast.visible ? 'active' : ''}`}>
        {toast.message}
      </div>
      {/* ---------------------------------- */}
      <nav className="bottom-tab">
        {/* 홈 */}
        <div className={`tab-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => navigate('/store/main')}>
          <div className="icon home"></div> {/* 클래스명 home 추가 */}
          <span className="label">홈</span>
        </div>
        
        {/* 장바구니 */}
        <div className={`tab-item ${activeTab === 'cart' ? 'active' : ''}`} onClick={() => navigate('/store/cart')}>
          <div className="icon-wrapper">
            <div className="icon cart"></div> {/* 클래스명 cart 추가 */}
            {itemCount > 0 && <span className="badge">{itemCount}</span>}
          </div>
          <span className="label">장바구니</span>
        </div>

        {/* 내 정보 */}
        <div className={`tab-item ${activeTab === 'mypage' ? 'active' : ''}`} onClick={() => navigate('/store/mypage')}>
          <div className="icon mypage"></div> {/* 클래스명 mypage 추가 */}
          <span className="label">내 정보</span>
        </div>
      </nav>
    </>
  );
};

export default BottomTab;