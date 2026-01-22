import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동 훅 추가
import '../../assets/css/cart.css'; // 아래 CSS 파일 생성 필요
import { useCart } from '../../context/CartContext';
import { useHeader } from '../../context/HeaderContext';
import { useModal } from "../../context/ModalContext";

const CartPage = () => {
  const { setHeader } = useHeader();
  const { openModal } = useModal();
  const navigate = useNavigate();
  
  // 1. [핵심] Context에서 모든 데이터와 함수를 직접 가져옵니다.
  const { 
    cartItems, 
    updateCartItem, 
    updateAllCartItems, 
    removeFromCart, 
    removeCheckedItems,
    totalAmount,
    shippingFee,
    finalAmount
  } = useCart();

  // 헤더 설정
  useEffect(() => {
    setHeader('장바구니', true);
  }, []);

  // 2. 전체 선택 상태 계산 (항상 Context의 cartItems 기준으로 계산됨)
  const isAllChecked = cartItems.length > 0 && cartItems.every((item) => item.checked);

  // 전체 선택 핸들러
  const handleSelectAll = () => {
    updateAllCartItems({ checked: !isAllChecked });
  };

  // 개별 아이템 토글 핸들러
  const handleToggleItem = (prodId, currentChecked) => {
    updateCartItem(prodId, { checked: !currentChecked });
  };

  // 개별 아이템 토글 핸들러
  const handleItemCount = (prodId, itemCount) => {
    updateCartItem(prodId, { quantity: itemCount });
  };

   const handleRemoveSelected = () => {
      // 1. 체크된(checked === true) 상품만 골라냅니다.
      // 2. 그 상품들의 prodId만 추출해서 배열로 만듭니다. (예: [101, 103, 105])
      const selectedIds = cartItems
            .filter((item) => item.checked)
            .map((item) => item.prodId);

      if (selectedIds.length === 0) {
         openModal("안내", "삭제할 상품을 선택해주세요.");
         return;
      }

      // 3. 배열을 통째로 넘깁니다.
      removeFromCart(selectedIds);
   };

   // 상품 상세 이동 핸들러 (jQuery click 이벤트 대체)
    const handleProductClick = (prodId) => {
        navigate(`/store/productDetail/${prodId}`);
    };

  // 이미지 에러 핸들러
  const handleImageError = (e) => {
    e.target.src = '/images/no-image.png';
  };

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
            <input 
                  type="checkbox"  
                  checked={isAllChecked} 
                  onChange={handleSelectAll}
                />
            <span className="custom-check"></span>
            <span className="label-text">전체선택</span>
        </label>
        <button className="btn-delete-selected" onClick={() => handleRemoveSelected()}>선택삭제</button>
      </div>

      {/* 2. 장바구니 리스트 */}
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.prodId} className="cart-item">
            {/* 체크박스 */}
            <div className="item-check">
               <label className="checkbox-group">
                  <input
                        type="checkbox"
                        checked={item.checked} 
                        onChange={() => handleToggleItem(item.prodId, item.checked)}
                   />
                  <span className="custom-check"></span>
               </label>
            </div>

            {/* 상품 정보 영역 */}
            <div className="item-content">
              <div className="item-top" onClick={() => handleProductClick(item.prodId)}>
                 <img 
                     src={`${item.imageUrl}${item.fileName}`}
                     alt={item.prodName}
                     className="item-thumb" 
                     onError={handleImageError}
                  />
                 <div className="item-text">
                    <h4 className="item-title">{item.prodName}</h4>
                    <p className="item-option">{item.prodDesc}</p>
                 </div>
                 <button 
                     className="btn-remove-item" 
                     onClick={(e) => {
                                       e.stopPropagation(); // ⭐ 중요: 부모 div로 클릭 이벤트가 퍼지는 것을 막습니다!
                                       removeFromCart(item.prodId);
                                    }}>×
                  </button>
              </div>

              <div className="item-bottom">
                 {/* 수량 조절기 */}
                 <div className="qty-control">
                     {/* 1보다 작아지지 않게 Math.max 사용 */}
                     <button onClick={() => handleItemCount(item.prodId, Math.max(0, item.quantity - 1))}>−</button>
                     {/* item.quantity가 없으면 0을 보여주도록 안전장치(|| 0) 추가 */}
                     <input type="text" value={item.quantity || 0} readOnly />
                     <button onClick={() => handleItemCount(item.prodId, item.quantity + 1)}>+</button>
                  </div>
                 {/* 가격 */}
                 <div className="item-price">
                    {(item.prodPrice * item.quantity).toLocaleString()}원
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