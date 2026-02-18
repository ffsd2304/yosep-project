import React from 'react';

const PaymentTerms = ({ agreed, onAgreeChange }) => {
  return (
    <div className="checkout-section terms-section">
      {/* style.css에 있는 checkbox-group 클래스 재사용 */}
      <div className="checkbox-group terms-header">
        <label>
          <input 
            type="checkbox" 
            checked={agreed}
            onChange={(e) => onAgreeChange(e.target.checked)}
          />
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
  );
};

export default React.memo(PaymentTerms);