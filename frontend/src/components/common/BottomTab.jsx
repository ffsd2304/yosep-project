import "../../assets/css/BottomTab.css";
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const BottomTab = ({ activeTab, onTabChange }) => {
  const { cartItems } = useCart();

  const { toast } = useToast();
  
  const totalCount = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
  const itemCount = cartItems.length; // 상품 종류의 갯수 (Unique Product Count)

  return (
    <>
      {/* --- 여기가 토스트 메시지 UI입니다 --- */}
      <div className={`toast-popup ${toast.visible ? 'active' : ''}`}>
        {toast.message}
      </div>
      {/* ---------------------------------- */}
      <nav className="bottom-tab">
        {/* 홈 */}
        <div className={`tab-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => onTabChange('home')}>
          <div className="icon home"></div> {/* 클래스명 home 추가 */}
          <span className="label">홈</span>
        </div>
        
        {/* 장바구니 */}
        <div className={`tab-item ${activeTab === 'cart' ? 'active' : ''}`} onClick={() => onTabChange('cart')}>
          <div className="icon-wrapper">
            <div className="icon cart"></div> {/* 클래스명 cart 추가 */}
            {itemCount > 0 && <span className="badge">{itemCount}</span>}
          </div>
          <span className="label">장바구니</span>
        </div>

        {/* 내 정보 */}
        <div className={`tab-item ${activeTab === 'mypage' ? 'active' : ''}`} onClick={() => onTabChange('mypage')}>
          <div className="icon mypage"></div> {/* 클래스명 mypage 추가 */}
          <span className="label">내 정보</span>
        </div>
      </nav>
    </>
  );
};

export default BottomTab;