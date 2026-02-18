import React from 'react';

const PaymentAddress = ({ 
  selectedAddr, 
  onAddressChange, 
  deliveryRequest, 
  onDeliveryRequestChange, 
  customRequest, 
  onCustomRequestChange, 
  requestOptions 
}) => {
  return (
    <div className="checkout-section">
      <div className="section-header">
        <h2 className="section-title">배송지</h2>
        <button className="btn-change-addr" onClick={onAddressChange}>변경</button>
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
          onChange={(e) => onDeliveryRequestChange(e.target.value)}
        >
          <option value="">배송 요청사항을 선택해주세요.</option>
          {requestOptions.map((item) => (
            <option key={item.detailCode} value={item.detailCode}>
              {item.detailName}
            </option>
          ))}
        </select>

        {deliveryRequest === 'R004' && (
          <input
            type="text"
            className="delivery-direct-input"
            placeholder="배송 요청사항을 입력해주세요. (최대 50자)"
            value={customRequest}
            onChange={(e) => onCustomRequestChange(e.target.value)}
            maxLength={50}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(PaymentAddress);