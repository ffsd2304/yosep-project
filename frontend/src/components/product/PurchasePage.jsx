import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import useCommonCode from '../../api/useCommonCode'; // 커스텀 훅 임포트
import '../../assets/css/product.css'; // 상품 관련 스타일 로드
import '../../assets/css/style.css'; // 기존 style.css import
import { useHeader } from '../../context/HeaderContext';
import ShippingAddress from '../address/ShippingAddress'; // 컴포넌트 임포트

const PurchasePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setHeader } = useHeader();

  const [isAddressMode, setIsAddressMode] = useState(false); // 배송지 선택 모드 상태
  // 1. useOrder에서 넘겨준 주문 상품 목록 받기
  // state가 없거나 orderItems가 없으면 빈 배열 처리
  const { orderItems } = location.state || { orderItems: [] };

  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  
  const [deliveryRequest, setDeliveryRequest] = useState(''); // 배송 요청사항 선택값
  const [customRequest, setCustomRequest] = useState('');         // 직접 입력 내용

  // 초기값을 null로 설정하고 API를 통해 가져옵니다.
  const [selectedAddr, setSelectedAddr] = useState(null);
  // 커스텀 훅을 사용하여 공통 코드 로드 (state와 effect가 훅 내부로 이동됨)
  const selectedCategory = useCommonCode('DLVR_REQ_TYPE');

  // 1. 초기 배송지 정보 로드
  useEffect(() => {
    // Mapper의 동적 쿼리를 활용하기 위해 defaultYn: 'Y' 파라미터 전달
    api.post('/api/addr/addresses', { defaultYn: 'Y' })
      .then(response => {
        if (response.data.status === 'SUCCESS' && response.data.addresses.length > 0) {
          // 서버에서 이미 기본 배송지만 필터링해서 가져왔으므로 첫 번째 요소를 바로 사용
          setSelectedAddr(response.data.addresses[0]);
          setDeliveryRequest(response.data.addresses[0].dlvrReqCode || '');
        }
      })
      .catch(error => {
        console.error('기본 배송지 로드 실패:', error);
      });

  }, []);

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
      {/* 배송지 선택 모드일 때 ShippingAddress 컴포넌트를 화면 전체에 띄움 */}
      {isAddressMode && (
        <ShippingAddress 
          selectedAddrId={selectedAddr?.addrSeq} // 현재 선택된 배송지 ID 전달
          onSelect={(addr) => {
            setSelectedAddr(addr);
            setDeliveryRequest(addr?.dlvrReqCode || '');
            setCustomRequest(addr?.dlvrReqMessage || '');
          }} 
          onBack={() => setIsAddressMode(false)} 
        />
      )}
        
      <div className="content-area checkout-bg">
        
        {/* ==================== 1. 배송지 정보 ==================== */}
        <div className="checkout-section">
          <div className="section-header">
            <h2 className="section-title">배송지</h2>
            <button className="btn-change-addr" onClick={() => setIsAddressMode(true)}>변경</button>
          </div>

          {selectedAddr ? (
            <div className="address-info-box">
              <div className="addr-tags">
                <span className="addr-badge">{selectedAddr.addrName}</span>
                {selectedAddr.defaultYn === 'Y' && <span className="addr-default-mark">기본</span>}
              </div>
              <p className="addr-user">{selectedAddr.recipientName} <span className="addr-phone">{selectedAddr.recipientPhone}</span></p>
              <p className="addr-detail">
                <span className="addr-zip-road">({selectedAddr.zipCode}) {selectedAddr.addrRoad}</span>
                <span className="addr-spec">{selectedAddr.addrDetail}</span>
              </p>
            </div>
          ) : (
            <div className="address-info-box addr-empty-text">
              등록된 배송지가 없습니다. 배송지를 추가해주세요.
            </div>
          )}

          <div className="delivery-request">
            <select 
              className={`common-select ${deliveryRequest === '' ? 'placeholder' : ''}`}
              value={deliveryRequest}
              onChange={(e) => setDeliveryRequest(e.target.value)}
            >
              <option value="">배송 요청사항을 선택해주세요.</option>
              {selectedCategory.map((item) => (
                <option key={item.detailCode} value={item.detailCode}>
                  {item.detailName}
                </option>
              ))}
            </select>

            {/* '직접 입력' 선택 시에만 input 필드 노출 */}
            {deliveryRequest === 'R004' && (
              <input
                type="text"
                className="delivery-direct-input"
                placeholder="배송 요청사항을 입력해주세요. (최대 50자)"
                value={customRequest}
                onChange={(e) => setCustomRequest(e.target.value)}
                maxLength={50}
              />
            )}
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
                  수량 {item.quantity}개 <span className="cp-divider">|</span> {shippingFee > 0 ? `배송비 ${shippingFee.toLocaleString()}원` : '무료배송'}
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