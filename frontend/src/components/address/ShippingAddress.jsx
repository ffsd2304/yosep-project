import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom'; // 1. import 추가
import api from '../../api/axios';
import useBodyScrollLock from '../../api/useBodyScrollLock';
import '../../assets/css/address.css';
import '../../assets/css/style.css';
import { useModal } from '../../context/ModalContext';
import ShippingAddressAdd from './ShippingAddressAdd';

const ShippingAddress = ({ onSelect, onBack, selectedAddrId }) => {
  useBodyScrollLock();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddMode, setIsAddMode] = useState(false); // 추가 모드 상태
  const [editData, setEditData] = useState(null);    // 수정할 데이터 상태
  const { openModal } = useModal();

  // 배경 스크롤 방지 로직
  useEffect(() => {
    // 컴포넌트 마운트 시 body 스크롤 금지
    document.body.style.overflow = 'hidden';
    return () => {
      // 컴포넌트 언마운트 시 body 스크롤 복구
      document.body.style.overflow = 'unset';
    };
  }, []);

  // [수정] 목록 조회 함수 분리 (재사용을 위해)
  const fetchAddresses = () => {
    setLoading(true);
    return api.post('/api/addr/addresses', {})
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          setAddresses(response.data.addresses);
        }
        setLoading(false);
        return response.data.addresses || []; // 다음 처리를 위해 목록 반환
      })
      .catch(error => {
        console.error('Error fetching shipping addresses:', error);
        setLoading(false);
        return [];
      });
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSelect = (addr) => {
    if (onSelect) {
      onSelect(addr); // 선택된 주소 정보를 부모에게 전달
    }
    if (onBack) onBack(); // 선택 후 이전 화면으로
  };

  // 수정 버튼 핸들러
  const handleEdit = (e, item) => {
    e.stopPropagation(); // 부모 클릭 이벤트 전파 방지
    setEditData(item);   // 수정할 데이터 설정
    setIsAddMode(true);  // 모달 열기
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsAddMode(false);
    setEditData(null); // 데이터 초기화
  };

  // 삭제 버튼 핸들러
  const handleDelete = (e, item) => {
    e.stopPropagation(); // 부모 클릭 이벤트 전파 방지
    
    openModal(
      "삭제 확인",
      "정말 삭제하시겠습니까?",
      () => {
        api.post('/api/addr/delete', { addrSeq: item.addrSeq })
          .then(response => {
            if (response.data.status === 'SUCCESS') {
              // 목록 갱신 후 최신 리스트를 받아옴
              fetchAddresses().then((newAddresses) => {
                // 삭제된 배송지가 현재 선택된 배송지였다면
                if (selectedAddrId && item.addrSeq === selectedAddrId) {
                  // 남은 목록 중 기본 배송지 찾기
                  const defaultAddr = newAddresses.find(addr => addr.defaultYn === 'Y');
                  // 기본 배송지가 있으면 선택, 없으면 선택 해제(null)
                  onSelect(defaultAddr || null);
                }
              });
            } else {
              alert(response.data.message || "삭제 실패");
            }
          })
          .catch(error => console.error("삭제 중 오류:", error));
      },
      "confirm"
    );
  };

  return createPortal(
    <div className="full-page-overlay page-shipping-list">
      
      {/* 배송지 추가 화면 (Overlay 위에 Overlay) */}
      {isAddMode && (
        <ShippingAddressAdd 
          initialData={editData} // 수정할 데이터 전달
          onBack={handleCloseModal} 
          onComplete={() => {
            handleCloseModal();  // 닫기 및 초기화
            fetchAddresses();    // 목록 갱신 (재조회)
          }}
        />
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
                    <button className="btn-addr-action" onClick={(e) => handleEdit(e, item)}>수정</button>
                    <div className="action-divider"></div>
                    <button className="btn-addr-action" onClick={(e) => handleDelete(e, item)}>삭제</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body // 3. body 태그로 전송
  );
};

export default ShippingAddress;