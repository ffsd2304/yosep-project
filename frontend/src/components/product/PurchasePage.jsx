import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/product.css'; // 상품 관련 스타일 로드
import '../../assets/css/style.css'; // 기존 style.css import
import { useHeader } from '../../context/HeaderContext';

const PurchasePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setHeader } = useHeader();

  // 1. useOrder에서 넘겨준 주문 상품 목록 받기
  // state가 없거나 orderItems가 없으면 빈 배열 처리
  const { orderItems } = location.state || { orderItems: [] };

  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  useEffect(() => {
    setHeader('주문/결제', true);

    // 잘못된 접근(데이터 없음) 시 뒤로가기
    if (!orderItems || orderItems.length === 0) {
      alert("구매할 상품 정보가 없습니다.");
      navigate(-1);
      return;
    }

    // 금액 계산
    const total = orderItems.reduce((acc, item) => {
      const price = Number(item.prodPrice || 0);
      const qty = Number(item.quantity || 1);
      return acc + (price * qty);
    }, 0);
    const shipping = (total >= 50000 || total === 0) ? 0 : 3000; // 5만원 이상 무료배송 예시

    setTotalPrice(total);
    setShippingFee(shipping);
    setFinalAmount(total + shipping);
  }, [orderItems, navigate, setHeader]);

  if (!orderItems || orderItems.length === 0) return null;

  return (
    <div className="mobile-container">
      {/* [헤더 영역] 
        사용자 요청: 공통 헤더 사용 예정이므로 공간만 확보하거나 제외 
        content-area 클래스가 padding-top 등을 제어한다고 가정
        */}
        
      <div className="content-area checkout-bg">
        
        {/* ==================== 1. 배송지 정보 ==================== */}
        <div className="checkout-section">
          <div className="section-header">
            <h2 className="section-title">배송지</h2>
            <button className="btn-change-addr">변경</button>
          </div>

          <div className="address-info-box">
            <div className="addr-tags">
              <span className="addr-badge">집</span>
              <span className="addr-default-mark">기본</span>
            </div>
            <p className="addr-user">백요셉 <span className="addr-phone">010-1234-5678</span></p>
            <p className="addr-detail">
              (02637) 서울특별시 동대문구 장안로 26다길 7 (장안동, 월드파크뷰 2차) 502호
            </p>
          </div>

          <div className="delivery-request">
            <select className="delivery-select" defaultValue="door">
              <option value="door">문 앞에 놓아주세요.</option>
              <option value="guard">경비실에 맡겨주세요.</option>
              <option value="call">배송 전 연락바랍니다.</option>
              <option value="direct">직접 입력</option>
            </select>
          </div>
        </div>

        {/* ==================== 2. 주문 상품 ==================== */}
        <div className="checkout-section">
          <h2 className="section-title">주문상품</h2>
          
          {orderItems.map((item, index) => (
            <div className="checkout-product-item" key={item.prodId || index}>
              <div className="cp-img-box">
                <img 
                  src={`${item.imageUrl}${item.fileName}`} 
                  alt={item.prodName}
                  onError={(e) => e.target.src = '/images/no-image.png'}
                />
              </div>
              <div className="cp-info-box">
                <div className="cp-brand">본사직영</div>
                <div className="cp-title">
                  {item.prodName}
                </div>
                <div className="cp-meta">
                  수량 {item.quantity}개 <span className="cp-divider">|</span> 무료배송
                </div>
                <div className="cp-price">{(item.prodPrice * item.quantity).toLocaleString()}원</div>
              </div>
            </div>
          ))}
        </div>

        {/* ==================== 3. 결제 금액 ==================== */}
        <div className="checkout-section">
          <h2 className="section-title">결제금액</h2>
          
          <div className="price-row">
            <span className="label">상품금액</span>
            <span className="value">{totalPrice.toLocaleString()}원</span>
          </div>
          <div className="price-row">
            <span className="label">총 배송비</span>
            <span className="value">{shippingFee > 0 ? `+${shippingFee.toLocaleString()}원` : '0원'}</span>
          </div>
          <div className="price-row">
            <span className="label">할인금액</span>
            <span className="value">-0원</span>
          </div>
          
          <div className="total-price-row">
            <span className="total-label">총 결제금액</span>
            <span className="total-value">{finalAmount.toLocaleString()}원</span>
          </div>
        </div>

        {/* ==================== 4. 약관 동의 ==================== */}
        <div className="checkout-section terms-section">
          {/* style.css에 있는 checkbox-group 클래스 재사용 */}
          <div className="checkbox-group terms-header">
            <label>
              <input type="checkbox" />
              <span className="custom-check"></span>
              <span className="terms-label-main">전체 동의</span>
            </label>
          </div>
          
          <div className="terms-list">
            <div className="terms-item">
              <span>구매조건 확인 및 결제진행 동의</span>
              <span className="arrow-right">{'>'}</span>
            </div>
            <div className="terms-item">
              <span>개인(신용)정보 제공 동의</span>
              <span className="arrow-right">{'>'}</span>
            </div>
            <div className="terms-item">
              <span>이용동의</span>
              <span className="arrow-right">{'>'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ==================== 하단 고정 결제 버튼 ==================== */}
      {/* 기존 product.css의 .action-buttons 재사용하되, 
        내부 구성을 단일 버튼으로 변경 
      */}
      <div className="action-buttons">
        <button className="buy-btn full-width">
          {finalAmount.toLocaleString()}원 결제하기
        </button>
      </div>

    </div>
  );
};

export default PurchasePage;