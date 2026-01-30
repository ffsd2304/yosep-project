import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom'; // 1. import 추가
import { useForm } from 'react-hook-form'; // 1. 라이브러리 import
import api from '../../api/axios';
import useBodyScrollLock from '../../api/useBodyScrollLock';
import useCommonCode from '../../api/useCommonCode'; // 커스텀 훅
import '../../assets/css/address.css';
import '../../assets/css/style.css';
import { useModal } from '../../context/ModalContext';
import AddressSearch from './AddressSearch'; // 주소 검색 컴포넌트

const ShippingAddressAdd = ({ onBack, onComplete, initialData }) => {
  useBodyScrollLock();
  const { openModal } = useModal();
  // 1. 공통코드 (배송지 타입)
  const addrTypeCategory = useCommonCode('ADDR_TYPE'); 
  
  // 2. 팝업 및 UI 상태
  const [showSearch, setShowSearch] = useState(false);

  // 세션에서 사용자 정보 미리 가져오기
  const storedUser = sessionStorage.getItem('loginUser');
  const parsedUser = storedUser ? JSON.parse(storedUser) : {};

  // 3. useForm 훅 초기화
  const { 
    register,     // 입력 필드를 폼에 등록하는 함수
    handleSubmit, // 저장 버튼 누를 때 실행되는 함수 (유효성 검사 포함)
    setValue,     // 값을 강제로 넣을 때 쓰는 함수 (주소 검색 등)
    watch,        // 입력값을 실시간으로 지켜보는 함수
    formState: { errors } // 에러 정보를 담고 있는 객체
  } = useForm({
    defaultValues: {
      // initialData가 있으면 그 값을 사용, 없으면 세션 정보나 빈 값 사용
      userId: initialData?.userId || parsedUser.userId || '',
      addrTypeCode: initialData?.addrTypeCode || '',
      addrName: initialData?.addrName || '',
      recipientName: initialData?.recipientName || parsedUser.userName || '',
      recipientPhone: initialData?.recipientPhone || parsedUser.phoneNum || '',
      zipCode: initialData?.zipCode || '',
      addrRoad: initialData?.addrRoad || '',
      addrJibun: initialData?.addrJibun || '',
      addrDetail: initialData?.addrDetail || '',
      addrDispDtcd: initialData?.addrDispDtcd || 'ROAD',
      defaultYn: initialData ? initialData.defaultYn === 'Y' : false, // Y/N -> boolean 변환
      dlvrReqCode: initialData?.dlvrReqCode || '',
      dlvrReqMessage: initialData?.dlvrReqMessage || ''
    }
  });

  // 실시간 값 감시 (조건부 렌더링용)
  const dlvrReqCode = watch('dlvrReqCode');
  const zipCode = watch('zipCode');
  const addrRoad = watch('addrRoad');
  const addrJibun = watch('addrJibun');

  // 공통코드가 로드되면 첫 번째 항목을 기본값으로 설정
  useEffect(() => {
    // 수정 모드가 아니고(값이 없고), 카테고리 목록이 로드되었을 때만 기본값 설정
    if (!initialData && addrTypeCategory && addrTypeCategory.length > 0) {
      // setValue로 값 설정 (UI 업데이트 포함)
      setValue('addrTypeCode', addrTypeCategory[0].detailCode);
    }
  }, [addrTypeCategory, setValue, initialData]);

  // 6. 주소 검색 완료 핸들러
  const handleAddressSelect = (data) => {
    // setValue('필드명', 값, 옵션)
    setValue('zipCode', data.zipCode, { shouldValidate: true });
    setValue('addrRoad', data.addrRoad);
    setValue('addrJibun', data.addrJibun);
    setValue('addrDetail', data.addrDetail, { shouldValidate: true });
    setValue('addrDispDtcd', data.addrDispDtcd);
    
    setShowSearch(false); // 팝업 닫기
  };

  // 7. 저장 버튼 핸들러 (유효성 검사 통과 시 실행됨)
  const onSubmit = async (data) => {
    try {
      // 체크박스 boolean -> Y/N 변환
      const finalData = {
        ...data,
        addrSeq: initialData?.addrSeq, // 수정 시 PK 필요 (없으면 undefined)
        defaultYn: data.defaultYn ? 'Y' : 'N'
      };

      console.log('저장할 배송지 데이터:', finalData);
      const response = await api.post('/api/addr/insert', finalData);
      
      if (response.data.status === 'SUCCESS') {
        // 확인 버튼을 눌렀을 때 onComplete 실행 (목록 갱신 + 화면 닫기)
        openModal(initialData ? "배송지 수정 완료" : "배송지 등록 완료", initialData ? "배송지가 성공적으로 수정되었습니다." : "배송지가 성공적으로 등록되었습니다.", onComplete);
      } else {
        alert('등록 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return createPortal(
    <div className="full-page-overlay page-shipping-add">
      
      {/* 주소 검색 팝업 (조건부 렌더링) */}
      {showSearch && (
         <AddressSearch 
           onClose={() => setShowSearch(false)} 
           onSelect={handleAddressSelect}
         />
      )}

      {/* 1. 헤더 */}
      <header className="common-header">
        <div className="header-left"></div>
        <h1 className="header-title">{initialData ? '배송지 수정' : '배송지 추가'}</h1>
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
        
          {/* 배송지 카테고리 */}
          <div className="form-group">
            <label className="form-label">배송지 카테고리</label>
            <select 
              className={`common-select ${errors.addrTypeCode ? 'error' : ''}`}
              {...register("addrTypeCode", { required: "배송지 카테고리를 선택해주세요." })}
            >
              {addrTypeCategory && addrTypeCategory.map((item) => (
                <option key={item.detailCode} value={item.detailCode}>
                  {item.detailName}
                </option>
              ))}
            </select>
            {errors.addrTypeCode && <span className="error-text">{errors.addrTypeCode.message}</span>}
          </div>

          {/* 배송지명 */}
          <div className="form-group">
            <label className="form-label">배송지명</label>
            <input 
              type="text" 
              className={`input-underline ${errors.addrName ? 'error' : ''}`}
              placeholder="배송지명" 
              maxLength={50}
              {...register("addrName", { required: "필수 입력입니다." })}
            />
            {errors.addrName && <span className="error-text">{errors.addrName.message}</span>}
          </div>

          {/* 받는 사람 */}
          <div className="form-group">
            <label className="form-label">받는사람</label>
            <input 
              type="text" 
              className={`input-underline ${errors.recipientName ? 'error' : ''}`}
              placeholder="이름" 
              maxLength={50}
              {...register("recipientName", { required: "필수 입력입니다." })}
            />
            {errors.recipientName && <span className="error-text">{errors.recipientName.message}</span>}
          </div>

          {/* 연락처 */}
          <div className="form-group">
            <label className="form-label">연락처</label>
            <input 
              type="tel" 
              className={`input-underline ${errors.recipientPhone ? 'error' : ''}`}
              placeholder="연락처" 
              {...register("recipientPhone", { 
                required: "필수 입력입니다.",
                pattern: {
                  value: /^\d+$/,
                  message: "숫자만 입력해주세요."
                },
                maxLength: {
                  value: 11,
                  message: "최대 11자리까지 입력 가능합니다."
                },
                minLength: {
                  value: 10,
                  message: "최소 10자리 이상 입력해주세요."
                }
              })}
            />
            {errors.recipientPhone && <span className="error-text">{errors.recipientPhone.message}</span>}
          </div>

          {/* 배송지 (우편번호 찾기) */}
          <div className="form-group">
            <label className="form-label">배송지</label>
            
            {/* 주소 검색 후 결과 텍스트 표시 */}
            {zipCode ? (
              <div style={{ marginBottom: '10px', fontSize: '15px', color: '#333', lineHeight: '1.4' }}>
                ({zipCode}) {addrRoad} <br/>
                <span style={{ fontSize: '13px', color: '#888' }}>[지번] {addrJibun}</span>
              </div>
            ) : null}

            <button 
              className="btn-zipcode-search"
              onClick={() => setShowSearch(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              우편번호 찾기
            </button>
            
            {/* 숨겨진 input으로 유효성 검사 연결 */}
            <input type="hidden" {...register("zipCode", { required: "주소를 검색해주세요." })} />
            {errors.zipCode && <span className="error-text">{errors.zipCode.message}</span>}
          </div>

          {/* 상세 주소 */}
          {/* 주소 검색 후에만 보여주는 것이 자연스럽지만, 퍼블 구조상 항상 노출 */}
          <div className="form-group">
            <label className="form-label">상세주소</label>
             <input 
                type="text" 
                className={`input-underline ${errors.addrDetail ? 'error' : ''}`}
                placeholder="상세주소 입력" 
                {...register("addrDetail", { required: "필수 입력입니다." })}
              />
              {errors.addrDetail && <span className="error-text">{errors.addrDetail.message}</span>}
          </div>

          {/* 배송메모 (선택) */}
          <div className="form-group">
            <label className="form-label">배송메모(선택)</label>
            <select 
              className={`common-select ${errors.dlvrReqCode ? 'error' : ''}`}
              {...register("dlvrReqCode", { required: "배송 요청사항을 선택해주세요." })}
            >
              <option value="">배송 유의사항을 선택해주세요.</option>
              <option value="R001">문 앞에 놓아주세요.</option>
              <option value="R002">경비실에 맡겨주세요.</option>
              <option value="R003">배송 전 연락바랍니다.</option>
              <option value="direct">직접 입력</option>
            </select>
            {errors.dlvrReqCode && <span className="error-text">{errors.dlvrReqCode.message}</span>}

            {/* 직접 입력 선택 시 노출 */}
            {dlvrReqCode === 'direct' && (
              <>
              <input
                type="text"
                className={`input-underline ${errors.dlvrReqMessage ? 'error' : ''}`}
                style={{ marginTop: '10px' }}
                placeholder="요청사항을 입력해주세요."
                {...register("dlvrReqMessage", { 
                  validate: (value) => {
                    // 직접 입력 모드일 때만 필수 체크
                    if (dlvrReqCode === 'direct' && !value.trim()) {
                      return "필수 입력입니다.";
                    }
                    return true;
                  }
                })}
              />
              {errors.dlvrReqMessage && <span className="error-text">{errors.dlvrReqMessage.message}</span>}
              </>
            )}
          </div>

          {/* 기본 배송지 설정 체크박스 */}
          <div className="checkbox-group" style={{ marginTop: '10px' }}>
            <label>
              <input 
                type="checkbox" 
                {...register("defaultYn")}
              />
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
        {/* handleSubmit(onSubmit)을 호출하면 유효성 검사 후 onSubmit 실행 */}
        <button className="btn-save" onClick={handleSubmit(onSubmit)}>
          저장
        </button>
      </div>

    </div>,
    document.body // 3. body 태그로 전송
  );
};

export default ShippingAddressAdd;