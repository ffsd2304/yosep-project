import { useEffect, useState } from 'react';
import api from '../../api/axios';
import '../../assets/css/address.css';
import '../../assets/css/style.css';
import ShippingAddressAdd from './ShippingAddressAdd';

const ShippingAddress = ({ onSelect, onBack }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddMode, setIsAddMode] = useState(false); // 추가 모드 상태

  // 배경 스크롤 방지 로직
  useEffect(() => {
    // 컴포넌트 마운트 시 body 스크롤 금지
    document.body.style.overflow = 'hidden';
    return () => {
      // 컴포넌트 언마운트 시 body 스크롤 복구
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    // 백엔드 RestController가 PostMapping이므로 post로 호출
    api.post('/api/member/addresses', {})
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          setAddresses(response.data.addresses);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching shipping addresses:', error);
        setLoading(false);
      });
  }, []);

  const handleSelect = (addr) => {
    if (onSelect) {
      onSelect(addr); // 선택된 주소 정보를 부모에게 전달
    }
    if (onBack) onBack(); // 선택 후 이전 화면으로
  };

  return (
    <div className="address-component shipping-address-overlay">
      
      {/* 배송지 추가 화면 (Overlay 위에 Overlay) */}
      {isAddMode && (
        <ShippingAddressAdd onBack={() => setIsAddMode(false)} />
      )}

      {/* 1. 공통 헤더 (CommonHeader.css 스타일 활용) */}
      <header className="common-header">
        {/* 왼쪽: 비워두거나 뒤로가기 버튼 */}
        <div className="header-left"></div>
        
        {/* 가운데: 타이틀 */}
        <h1 className="header-title">배송지</h1>
        
        {/* 오른쪽: 닫기(X) 아이콘 */}
        <div className="header-right" onClick={onBack} style={{ cursor: 'pointer' }}>
          <img 
            src="/images/icon/x-icon.png" 
            alt="닫기" 
            style={{ width: '24px', height: '24px', display: 'block' }} 
          />
        </div>
      </header>

      {/* 2. 컨텐츠 영역 */}
      <div className="address-page-wrapper">
        
        {/* 상단: 새 배송지 추가 버튼 */}
        <button className="btn-add-address" onClick={() => setIsAddMode(true)}>
          <span style={{ fontSize: '18px', marginRight: '4px' }}>+</span> 
          새로운 배송지 추가
        </button>

        {/* 배송지 리스트 */}
        <div className="address-list">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>로딩 중...</div>
          ) : addresses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>등록된 배송지가 없습니다.</div>
          ) : (
            addresses.map((item) => (
              <div key={item.addrSeq} className="address-item" onClick={() => handleSelect(item)}>
                {/* 체크 아이콘 (기본 배송지면 selected 클래스) */}
                <div className={`addr-check-btn ${item.defaultYn === 'Y' ? 'selected' : ''}`}>
                  <svg 
                    width="14" height="14" viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" strokeWidth="3" 
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>

                <div className="addr-info-box">
                  <div className="addr-header-row">
                    <span className="addr-name">{item.recipientName}</span>
                    {item.defaultYn === 'Y' && <span className="badge-default">기본</span>}
                    <span className="addr-divider-ver">|</span>
                    <span className="addr-phone">{item.recipientPhone}</span>
                  </div>

                  <div className="addr-detail-text">
                    <span className="addr-zip-road">({item.zipCode}) {item.addrRoad}</span>
                    <span className="addr-spec">{item.addrDetail}</span>
                  </div>

                  {/* 수정 | 삭제 (이벤트 전파 방지 필요) */}
                  <div className="addr-action-row" onClick={(e) => e.stopPropagation()}>
                    <button className="btn-addr-action">수정</button>
                    <div className="action-divider"></div>
                    <button className="btn-addr-action">삭제</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;