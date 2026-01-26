import { useEffect } from 'react';
import '../../assets/css/address.css';
import '../../assets/css/style.css'; // 필요 시 주석 해제

const ShippingAddressAdd = ({ onBack }) => {

  // 배경 스크롤 방지 (팝업처럼 쓸 경우)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="address-component shipping-add-overlay">
      {/* 1. 헤더 (배송지 추가) */}
      <header className="common-header">
        {/* 왼쪽: 비워둠 */}
        <div className="header-left"></div>
        
        {/* 가운데: 타이틀 */}
        <h1 className="header-title">배송지 추가</h1>
        
        {/* 오른쪽: 닫기(X) 아이콘 */}
        <div className="header-right" onClick={onBack} style={{ cursor: 'pointer' }}>
          <img 
            src="/images/icon/x-icon.png" 
            alt="닫기" 
            style={{ width: '24px', height: '24px', display: 'block' }} 
          />
        </div>
      </header>

      {/* 2. 입력 폼 영역 */}
      <div className="address-page-wrapper">
        <div className="form-container">
        
        {/* 배송지명 */}
        <div className="form-group">
          <label className="form-label">배송지명</label>
          <input 
            type="text" 
            className="input-underline" 
            placeholder="배송지명" 
          />
        </div>

        {/* 받는 사람 */}
        <div className="form-group">
          <label className="form-label">받는사람</label>
          <input 
            type="text" 
            className="input-underline" 
            placeholder="이름" 
          />
        </div>

        {/* 연락처 */}
        <div className="form-group">
          <label className="form-label">연락처</label>
          <input 
            type="tel" 
            className="input-underline" 
            placeholder="연락처" 
          />
        </div>

        {/* 배송지 (우편번호 찾기) */}
        <div className="form-group">
          <label className="form-label">배송지</label>
          <button className="btn-zipcode-search">
            {/* 돋보기 아이콘 */}
            <svg 
              width="16" height="16" viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" strokeWidth="2" 
              strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            우편번호 찾기
          </button>
          {/* 주소가 선택되면 여기에 텍스트로 표시되거나 input이 추가될 예정 */}
        </div>

        {/* 배송메모 (선택) */}
        <div className="form-group">
          <label className="form-label">배송메모(선택)</label>
          <select className="select-underline">
            <option value="">배송 유의사항을 선택해주세요.</option>
            <option value="door">문 앞에 놓아주세요.</option>
            <option value="security">경비실에 맡겨주세요.</option>
            <option value="call">배송 전 연락바랍니다.</option>
            <option value="direct">직접 입력</option>
          </select>
        </div>

        {/* 기본 배송지 설정 체크박스 */}
        <div className="checkbox-group" style={{ marginTop: '10px' }}>
          <label>
            <input type="checkbox" />
            <span className="custom-check"></span>
            <span style={{ marginLeft: '8px', fontSize: '14px', color: '#333' }}>
              기본 배송지로 선택
            </span>
          </label>
        </div>

        </div>
      </div>

      {/* 3. 하단 저장 버튼 */}
      <div className="bottom-btn-area">
        <button className="btn-save">
          저장
        </button>
      </div>

    </div>
  );
};

export default ShippingAddressAdd;