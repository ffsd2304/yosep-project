import React from 'react';

const PaymentItems = ({ orderItems, shippingFee }) => {
  return (
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
  );
};

export default React.memo(PaymentItems);