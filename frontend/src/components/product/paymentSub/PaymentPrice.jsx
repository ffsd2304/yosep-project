import React from 'react';

const PaymentPrice = ({ totalPrice, shippingFee, finalAmount }) => {
  return (
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
  );
};

export default React.memo(PaymentPrice);