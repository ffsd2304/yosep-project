import usePaymentPageLogic from '../../api/payment/usePaymentPageLogic';
// product.css는 이 페이지 고유의 스타일(checkout-bg 등)이 있으므로 유지합니다.
import '../../assets/css/product.css';
import ShippingAddress from '../address/ShippingAddress';
import PaymentAddress from './paymentSub/PaymentAddress';
import PaymentItems from './paymentSub/PaymentItems';
import PaymentPrice from './paymentSub/PaymentPrice';
import PaymentTerms from './paymentSub/PaymentTerms';

const PaymentPage = () => {
  const { state, actions } = usePaymentPageLogic();
  
  if (!state.orderItems || state.orderItems.length === 0) return null;

  return (
    /* 1. <div className="mobile-container"> 제거 
          -> App.jsx가 이미 감싸고 있습니다.
    */
    <>
      {/* 배송지 선택 모드 (전체 화면 덮는 오버레이) */}
      {state.isAddressMode && (
        <ShippingAddress 
          selectedAddrId={state.selectedAddr?.addrSeq}
          onSelect={(addr) => {
            actions.setSelectedAddr(addr);
            actions.setDeliveryRequest(addr?.dlvrReqCode || '');
            actions.setCustomRequest(addr?.dlvrReqMessage || '');
            actions.setIsAddressMode(false); // ✅ 주소를 선택하면 목록 창을 자동으로 닫아줍니다.
          }} 
          onBack={() => actions.setIsAddressMode(false)} 
        />
      )}
        
      {/* 2. "content-area" 클래스 제거
            -> App.jsx에서 이미 <main className="content-area">로 감싸고 있습니다.
            -> 여기서는 배경색을 위한 'checkout-bg'만 남깁니다.
      */}
      <div className="checkout-bg">
        
        {/* ==================== 1. 배송지 정보 ==================== */}
        <PaymentAddress 
          selectedAddr={state.selectedAddr}
          onAddressChange={() => actions.setIsAddressMode(true)}
          deliveryRequest={state.deliveryRequest}
          onDeliveryRequestChange={actions.setDeliveryRequest}
          customRequest={state.customRequest}
          onCustomRequestChange={actions.setCustomRequest}
          requestOptions={state.selectedCategory}
        />

        {/* ==================== 2. 주문 상품 ==================== */}
        <PaymentItems orderItems={state.orderItems} shippingFee={state.shippingFee} />

        {/* ==================== 3. 결제 금액 ==================== */}
        <PaymentPrice 
          totalPrice={state.totalPrice} 
          shippingFee={state.shippingFee} 
          finalAmount={state.finalAmount} 
        />

        {/* ==================== 4. 약관 동의 ==================== */}
        <PaymentTerms 
          agreed={state.termsAgreed}
          onAgreeChange={actions.setTermsAgreed}
        />

      </div>

      {/* ==================== 하단 고정 결제 버튼 ==================== */}
      <div className="action-buttons">
        <button className="buy-btn full-width" onClick={actions.handleOrder}>
          {state.finalAmount.toLocaleString()}원 결제하기
        </button>
      </div>
    </>
  );
};

export default PaymentPage;