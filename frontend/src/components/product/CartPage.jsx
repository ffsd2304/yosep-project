import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동 훅 추가
import '../../assets/css/cart.css'; // 아래 CSS 파일 생성 필요
import { useHeader } from '../../context/HeaderContext';

const CartPage = () => {
  const { setHeader } = useHeader();
  const navigate = useNavigate();
  // 1. 초기 상태를 빈 배열로 시작
  const [cartItems, setCartItems] = useState([]);

  // 헤더 설정
  useEffect(() => {
    setHeader('장바구니', true);
  }, []);

  // 2. [핵심] 화면이 열릴 때 localStorage에서 데이터 가져오기
  useEffect(() => {
    const storedCart = localStorage.getItem('shopping_cart');
    
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        // 배열인지 확인 후 상태 업데이트
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      } catch (e) {
        console.error("장바구니 데이터 파싱 오류", e);
      }
    }
  }, []);

  // 총 금액 계산 (단순 표시용)
  const totalAmount = cartItems.reduce((acc, item) => item.checked ? acc + (item.price * item.quantity) : acc, 0);
  const shippingFee = totalAmount > 50000 ? 0 : 3000; // 5만원 이상 무료배송 예시
  const finalAmount = totalAmount + shippingFee;
  if (cartItems.length === 0) {
    return (
      <div className="cart-page-wrapper empty-view">
         <div className="empty-icon-area">
            {/* 이미지 대신 텍스트 아이콘 사용 (원하시면 img 태그로 교체 가능) */}
            <span className="empty-icon">🛒</span> 
         </div>
         <h2 className="empty-title">장바구니에 담은 상품이 없어요</h2>
         <p className="empty-desc">원하는 상품을 담아보세요</p>
         
         <button className="btn-go-shopping" onClick={() => navigate('/store/main')}>
            쇼핑하러 가기
         </button>
      </div>
    );
  }
  return (
    <div className="cart-page-wrapper">
      
      {/* 1. 상단 전체 선택 바 */}
      <div className="cart-controls">
        <label className="checkbox-group">
            <input type="checkbox" defaultChecked />
            <span className="custom-check"></span>
            <span className="label-text">전체선택</span>
        </label>
        <button className="btn-delete-selected">선택삭제</button>
      </div>

      {/* 2. 장바구니 리스트 */}
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            {/* 체크박스 */}
            <div className="item-check">
               <label className="checkbox-group">
                  <input type="checkbox" checked={item.checked} readOnly />
                  <span className="custom-check"></span>
               </label>
            </div>

            {/* 상품 정보 영역 */}
            <div className="item-content">
              <div className="item-top">
                 <img src={item.image} alt={item.name} className="item-thumb" />
                 <div className="item-text">
                    <h4 className="item-title">{item.name}</h4>
                    <p className="item-option">{item.option}</p>
                 </div>
                 <button className="btn-remove-item">×</button>
              </div>

              <div className="item-bottom">
                 {/* 수량 조절기 */}
                 <div className="qty-control">
                    <button>−</button>
                    <input type="text" value={item.quantity} readOnly />
                    <button>+</button>
                 </div>
                 {/* 가격 */}
                 <div className="item-price">
                    {(item.price * item.quantity).toLocaleString()}원
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. 결제 예정 금액 (Order Summary) */}
      <div className="order-summary">
         <h3>결제 예정금액</h3>
         <div className="summary-row">
            <span>상품금액</span>
            <span>{totalAmount.toLocaleString()}원</span>
         </div>
         <div className="summary-row">
            <span>배송비</span>
            <span>{shippingFee === 0 ? '무료' : `+${shippingFee.toLocaleString()}원`}</span>
         </div>
         <div className="summary-row discount">
            <span>할인금액</span>
            <span>-0원</span>
         </div>
         <div className="summary-divider"></div>
         <div className="summary-row total">
            <span>총 결제금액</span>
            <span className="highlight">{finalAmount.toLocaleString()}원</span>
         </div>
      </div>

      {/* 하단 고정바에 가려지지 않게 여백 추가 */}
      <div className="bottom-spacer" style={{height: '100px'}}></div>

      {/* 4. 하단 고정 구매 버튼 (Fixed Bottom) */}
      <div className="cart-bottom-bar">
         <div className="bar-info">
            <span className="count">총 {cartItems.filter(i=>i.checked).length}개</span>
            <span className="price">{finalAmount.toLocaleString()}원</span>
         </div>
         <button className="btn-order">구매하기</button>
      </div>

    </div>
  );
};

export default CartPage;