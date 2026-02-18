import { useState } from 'react';
import { createPortal } from 'react-dom'; // 👈 1. createPortal 불러오기
import api from '../../api/axios';
import '../../assets/css/address.css';
import '../../assets/css/style.css';
import { useLoading } from '../../context/LoadingContext'; // 전역 로딩 훅

const AddressSearch = ({ onClose, onSelect }) => {

  // 상태 정의
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailAddress, setDetailAddress] = useState('');
  const [addrDispDtcd, setAddrDispDtcd] = useState('ROAD');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { isLoading, showLoading, hideLoading } = useLoading(); // 전역 로딩 상태 사용

  const searchAddress = async (isNewSearch = true) => {
    // 이벤트 객체나 undefined가 넘어오면 새로운 검색으로 간주
    if (typeof isNewSearch === 'object' || isNewSearch === undefined) isNewSearch = true;

    if(!keyword) return;
    if (isLoading) return;

    const targetPage = isNewSearch ? 1 : page + 1;

    try {
      showLoading();
      const response = await api.get('/api/addr/juso', {
        params: {
          keyword: keyword, // state에 있는 검색어
          page: targetPage
        }
      });

      console.log("주소 검색 응답:", response.data);

      // API 응답 구조: response.data.results.juso (배열)
      if (response.data && response.data.results) {
        const { common, juso } = response.data.results;

        if (common) {
          setTotalCount(parseInt(common.totalCount, 10));
        }
        
        if (juso) {

        // 🔥 여기서 DTO와 이름을 맞춥니다! (Mapping)
        const mappedList = juso.map((item) => ({
          // [DTO 필드명] : [API 필드명]
          zipCode: item.zipNo,         // 우편번호 (02633)
          addrRoad: item.roadAddr,     // 도로명 주소 (서울 동대문구 장한로 3)
          addrJibun: item.jibunAddr,   // 지번 주소 (서울 동대문구 장안동 416-5)
          
          // 상세 주소는 사용자가 직접 입력해야 하므로 비워둡니다.
          // (단, 건물명이 있으면 사용자 편의를 위해 미리 넣어줄 수도 있습니다)
          addrDetail: item.bdNm ? item.bdNm : "", 
          
          // 나머지 DTO 필드들은 주소 검색 결과엔 없으므로 초기값 세팅
          userId: "",        // 나중에 로그인 정보에서 가져옴
          userName: "",      // 나중에 로그인 정보에서 가져옴
          recipientName: "", // 사용자가 입력
          recipientPhone: "",// 사용자가 입력
          defaultYn: "N",
          dlvrReqCode: "",
          dlvrReqMessage: ""
        }));

        // 변환된 리스트를 상태에 저장
        if (isNewSearch) {
          setSearchResults(mappedList);
          setPage(1);
        } else {
          setSearchResults(prev => [...prev, ...mappedList]);
          setPage(targetPage);
        }
       } else {
         if (isNewSearch) setSearchResults([]);
       }
      } else {
        console.log("검색 결과가 없습니다.");
      }

    } catch (error) {
      console.error("주소 검색 실패", error);
    } finally {
      hideLoading();
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      if (searchResults.length < totalCount && !isLoading) {
        searchAddress(false);
      }
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setDetailAddress('');
    setAddrDispDtcd('ROAD');
  };

  const closeBottomSheet = () => setSelectedItem(null);

  const handleConfirm = () => {
    if (!selectedItem) return;

    // 1. 먼저 업데이트된 데이터를 포함하는 새 객체를 만듭니다.
    const finalAddress = {
      ...selectedItem,
      addrDetail: detailAddress,
      addrDispDtcd: addrDispDtcd // DTO 필드명과 일치시킵니다.
    };
    // 2. 완성된 객체를 부모 컴포넌트로 전달합니다.
    if (onSelect) onSelect(finalAddress);
  };

  // 👈 2. 전체 JSX를 createPortal로 감싸서 document.body로 보내버리기
  return createPortal(
    <>
      {/* === 메인 검색 화면 === */}
      <div className="full-page-overlay page-address-search">
        <header className="common-header">
          <div className="header-left"></div>
          <h1 className="header-title">주소검색</h1>
          <div className="header-right" onClick={onClose}>
            <img src="/images/icon/x-icon.png" alt="닫기" className="header-close-icon" />
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

          <div 
            className="search-result-list" 
            onScroll={handleScroll}
          >
            {searchResults.map((item, index) => (
              <div key={index} onClick={() => handleItemClick(item)} className="result-item">
                <div className="result-zip">(우) {item.zipCode}</div>
                <div className="result-road">{item.addrRoad}</div>
                <div className="result-jibun">[지번] {item.addrJibun}</div>
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
                <img src="/images/icon/x-icon.png" alt="닫기" className="sheet-close-icon" />
              </button>
            </div>
            
            <div className="sheet-body">
              <p className="zip-code-text">(우){selectedItem.zipCode}</p>
              <p className="full-address-text">
                {selectedItem.addrRoad}<br/>
                <span className="addr-jibun-gray">{selectedItem.addrJibun}</span>
              </p>

              <div className={`addr-type-box ${addrDispDtcd === 'ROAD' ? 'selected' : ''}`} onClick={() => setAddrDispDtcd('ROAD')}>
                <div className="custom-radio"></div>
                <div className="type-content">
                  <span className="type-label">도로명</span>
                  <p className="type-desc">{selectedItem.addrRoad}</p>
                </div>
              </div>

              <div className={`addr-type-box ${addrDispDtcd === 'JIBUN' ? 'selected' : ''}`} onClick={() => setAddrDispDtcd('JIBUN')}>
                <div className="custom-radio"></div>
                <div className="type-content">
                  <span className="type-label">지번</span>
                  <p className="type-desc">{selectedItem.addrJibun}</p>
                </div>
              </div>

              <div className="detail-input-area">
                <input 
                  type="text"
                  className="input-underline input-bg-light"
                  placeholder="상세주소를 입력해주세요 (예: 101동 502호)"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
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