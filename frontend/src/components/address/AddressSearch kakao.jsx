import axios from 'axios';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom'; // 👈 1. createPortal 불러오기
import '../../assets/css/address.css';
import '../../assets/css/style.css';

//****************  카카오 주소찾기 샘플******************//
const AddressSearch = ({ onClose, onSelect }) => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailAddress, setDetailAddress] = useState('');
  const [addressType, setAddressType] = useState('R');

  const REST_API_KEY = 'c1b70d83d2c30ca7010d7c7417aef40c';
  // 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const searchAddress = async () => {
    if(!keyword) return;
    try {
      // 주의: 주소를 https://dapi.kakao.com 이 아니라 /kakao 로 시작해야 프록시가 작동함
      const response = await axios.get('/kakao/v2/local/search/address.json', {
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`, // KakaoAK 뒤에 한 칸 띄어쓰기 필수
        },
        params: {
          query: keyword,       // 검색어
          page: 1,              // 1페이지
          size: 20              // 20개씩 조회
        }
      });

      console.log(response.data); // 콘솔에서 결과 확인
      
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const handleSearch = async () => {
    // 테스트 더미 데이터
    setSearchResults([
      {
        zipNo: '02637',
        roadAddr: '서울 동대문구 장한로26다길 7 (장안동, 월튼파크뷰2차)',
        address_name : '서울 동대문구 장한로26다길 7',
        jibunAddr: '서울 동대문구 장안동 337-2 월튼파크뷰2차'
      }
    ]);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setDetailAddress('');
    setAddressType('R');
  };

  const closeBottomSheet = () => setSelectedItem(null);

  const handleConfirm = () => {
    if (!selectedItem) return;
    const finalData = {
      zonecode: selectedItem.zipNo,
      address: addressType === 'R' ? selectedItem.roadAddr : selectedItem.jibunAddr,
      roadAddress: selectedItem.roadAddr,
      jibunAddress: selectedItem.jibunAddr,
      detailAddress: detailAddress,
      userSelectedType: addressType
    };
    if (onSelect) onSelect(finalData);
  };

  // 👈 2. 전체 JSX를 createPortal로 감싸서 document.body로 보내버리기
  return createPortal(
    <>
      {/* === 메인 검색 화면 === */}
      <div className="address-search-overlay">
        <header className="common-header">
          <div className="header-left"></div>
          <h1 className="header-title">주소검색</h1>
          <div className="header-right" onClick={onClose} style={{ cursor: 'pointer' }}>
            <img src="/images/icon/x-icon.png" alt="닫기" style={{ width: '24px', height: '24px', display: 'block' }} />
          </div>
        </header>

        <div className="address-page-wrapper">
          <div className="search-guide-area">
            <p className="search-guide-label">도로명, 건물명 또는 지번 입력</p>
            <div className="search-input-box">
              <input 
                type="text" 
                className="input-underline search-input" 
                placeholder="예) 종로4길 7"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchAddress()}
              />
              {keyword && (
                <button className="btn-input-clear" onClick={() => setKeyword('')}>✕</button>
              )}
            </div>
          </div>

          <div className="search-result-list" style={{ marginTop: '20px' }}>
            {searchResults.map((item, index) => (
              <div key={index} onClick={() => handleItemClick(item)} style={{ padding: '15px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }}>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{item.roadAddr}</div>
                <div style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>[지번] {item.jibunAddr}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bottom-btn-area">
          <button className="btn-save" onClick={searchAddress} disabled={!keyword}>검색</button>
        </div>
      </div>

      {/* === 상세 주소 입력 바텀 시트 === */}
      {selectedItem && (
        <div className="bottom-sheet-backdrop" onClick={closeBottomSheet}>
          <div className="bottom-sheet-container" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-header">
              <span className="sheet-title">상세주소입력</span>
              <button className="btn-sheet-close" onClick={closeBottomSheet}>
                <img src="/images/icon/x-icon.png" alt="닫기" style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            
            <div className="sheet-body">
              <p className="zip-code-text">(우){selectedItem.zipNo}</p>
              <p className="full-address-text">
                {selectedItem.roadAddr}<br/>
                <span style={{color: '#999', fontSize: '13px'}}>{selectedItem.jibunAddr}</span>
              </p>

              <div className={`addr-type-box ${addressType === 'R' ? 'selected' : ''}`} onClick={() => setAddressType('R')}>
                <div className="custom-radio"></div>
                <div className="type-content">
                  <span className="type-label">도로명</span>
                  <p className="type-desc">{selectedItem.roadAddr}</p>
                </div>
              </div>

              <div className={`addr-type-box ${addressType === 'J' ? 'selected' : ''}`} onClick={() => setAddressType('J')}>
                <div className="custom-radio"></div>
                <div className="type-content">
                  <span className="type-label">지번</span>
                  <p className="type-desc">{selectedItem.jibunAddr}</p>
                </div>
              </div>

              <div className="detail-input-area">
                <input 
                  type="text"
                  className="input-underline"
                  placeholder="상세주소를 입력해주세요 (예: 101동 502호)"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  style={{ backgroundColor: '#f9f9f9', padding: '10px' }} 
                  autoFocus
                />
              </div>

              <button className="btn-save" onClick={handleConfirm}>확인</button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body // 👈 3. 이 컴포넌트를 body 태그 끝에 렌더링해라!
  );
};

export default AddressSearch;