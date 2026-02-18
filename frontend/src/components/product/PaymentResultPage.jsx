import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/paymentResult.css';
import { useHeader } from '../../context/HeaderContext';

const PaymentResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setHeader } = useHeader();
  
  // 결제 페이지 등에서 넘어온 데이터를 받음 (없으면 null)
  const stateData = location.state || {};

  useEffect(() => {
    // 1. 헤더 설정: "주문완료", 뒤로가기 버튼 숨김(false) - 결제 중복 방지
    setHeader('주문/결제', false);
  }, [setHeader]);

  // 2. 화면에 보여줄 데이터 구성 (실제 데이터 + 없을 경우 더미 데이터)
  const orderInfo = {
    orderNo: stateData.merchant_uid || '',
    receiver: stateData.buyer_name || '',
    phone: stateData.buyer_tel || '',
    address: stateData.buyer_addr || '',
    message: stateData.custom_data?.message || '',
    // 상품 정보가 배열로 넘어왔다면 첫 번째 상품 정보 표시
    productImg: stateData.orderItems?.[0]?.imageUrl 
                ? `${stateData.orderItems[0].imageUrl}${stateData.orderItems[0].fileName}`
                : 'https://via.placeholder.com/80',
    productName: stateData.name || '',
    option: stateData.orderItems?.[0]?.optionName || '',
    paymentMethod: stateData.pay_method === 'card' ? '신용카드' : '간편결제',
    approvalNo: stateData.pg_tid || '', // 임시 승인번호
    approvalDate: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
    installment: '일시불',
    totalAmount: stateData.amount || 9900
  };

  const handleCopyOrderNo = () => {
    navigator.clipboard.writeText(orderInfo.orderNo)
      .then(() => alert('주문번호가 복사되었습니다.'))
      .catch(() => alert('복사에 실패했습니다.'));
  };

  // 주문/배송 목록으로 이동 시 데이터 전달
  const handleGoOrderList = () => {
    navigate('/store/orderList');
  };

  return (
    <>
      <div className="payment-result-wrap">
        
        {/* 1. 주문 번호 박스 (상단 여백 없이 바로 시작하거나 약간의 margin만 부여) */}
        <div className="order-no-box">
            <span className="label">주문번호</span>
            <span className="divider">|</span>
            <span className="value">{orderInfo.orderNo}</span>
            <button className="btn-copy" onClick={handleCopyOrderNo}>📋 복사</button>
        </div>

        {/* 2. 배송지 정보 */}
        <div className="result-section">
            <h3 className="section-title">배송지</h3>
            <div className="delivery-info">
                <div className="info-header">
                    <span className="addr-name">집 (기본)</span>
                </div>
                <div className="addr-user-row">
                    <span className="receiver">{orderInfo.receiver}</span>
                    <span className="divider">|</span>
                    <span className="phone">{orderInfo.phone}</span>
                </div>
                <div className="addr-detail-text">
                    {orderInfo.address}
                </div>
                <div className="addr-msg">
                    <span className="label">배송메시지</span> {orderInfo.message}
                </div>
            </div>

            {/* 주문 상품 간략 정보 */}
            <div className="ordered-product-item">
                <div className="img-box">
                    <img src={orderInfo.productImg} alt="상품이미지" onError={(e) => e.target.src = '/images/no-image.png'} />
                </div>
                <div className="text-box">
                    <p className="prod-name">{orderInfo.productName}</p>
                    {/* 수량이 2개 이상일 경우 '외 N건' 표시 로직 등 추가 가능 */}
                    <p className="prod-option">옵션 : {orderInfo.option}</p>
                </div>
            </div>
        </div>

        {/* 구분선 */}
        <div className="section-divider"></div>

        {/* 3. 결제 정보 */}
        <div className="result-section">
            <h3 className="section-title">결제정보</h3>
            <div className="payment-detail-list">
                <div className="row">
                    <span className="label">결제수단</span>
                    <span className="value">{orderInfo.paymentMethod}</span>
                </div>
                <div className="row">
                    <span className="label">승인번호</span>
                    <span className="value">{orderInfo.approvalNo}</span>
                </div>
                <div className="row">
                    <span className="label">승인일시</span>
                    <span className="value">{orderInfo.approvalDate}</span>
                </div>
                <div className="row">
                    <span className="label">할부</span>
                    <span className="value">{orderInfo.installment}</span>
                </div>
                
                <div className="total-amount-row">
                    <span className="label">총 결제금액</span>
                    <span className="value">{orderInfo.totalAmount.toLocaleString()}원</span>
                </div>
            </div>
        </div>

      </div>

      {/* 4. 하단 고정 버튼 (2개) */}
      <div className="action-buttons dual-buttons">
        <button className="btn-white" onClick={() => navigate('/')}>쇼핑계속하기</button>
        <button className="btn-yellow" onClick={handleGoOrderList}>주문/배송내역</button>
      </div>
    </>
  );
};

export default PaymentResultPage;