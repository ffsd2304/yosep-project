import { useEffect } from 'react';
import api from './axios'; // axios 인스턴스 import

const usePayment = () => {
  // 컴포넌트가 마운트될 때 IMP 초기화 (선택 사항)
  useEffect(() => {
    // index.html에 스크립트가 로드되었는지 확인
    if (!window.IMP) return;
  }, []);

  const requestPayment = async (orderData, callback) => {
    const { IMP } = window;
    
    // 포트원 관리자 콘솔에서 확인한 내 식별코드
    IMP.init(import.meta.env.VITE_PORTONE_CODE); 
    
    // 1. 주문번호 생성
    const merchant_uid = `mid_${new Date().getTime()}`;

    // 2. [추가] 결제 전 PENDING 상태로 DB에 저장
    try {
        // orderData에는 PaymentPage.jsx에서 넘겨준 receiver info, items 등이 포함되어야 함
        await api.post('/api/payment/pending', {
            ...orderData,
            portoneResponse: { 
                merchantUid: merchant_uid,
                merchant_uid: merchant_uid // DTO가 snake_case를 기대할 경우를 대비해 추가
            }, 
            // orderData에 orderItems, userId, receiver 정보 등이 포함되어 있어야 합니다.
        });
        console.log("PENDING 주문 생성 완료");
    } catch (error) {
        console.error("PENDING 주문 생성 실패:", error);
        alert("주문 생성 중 오류가 발생했습니다.");
        return; // 결제창 띄우지 않고 중단
    }

    // 3. 결제 요청 데이터 구성
    const data = {
        //pg: 'html5_inicis.INIpayTest', // KG이니시스 테스트 PG사
        pg: 'kakaopay.TC0ONETIME', // 카카오페이 테스트 PG사
      pay_method: 'card',
      merchant_uid: merchant_uid, // 위에서 생성한 ID 사용
      m_redirect_url: "http://10.101.66.120:5173/store/payment", // 모바일 결제 후 리다이렉트 URL
      ...orderData, // 상품명, 금액 등 외부에서 전달받은 정보
      amount: 1, // 테스트용 1원 고정 (실제 운영 시에는 orderData.amount 사용)
    };

    IMP.request_pay(data, (response) => {
      // 공통적인 로직 처리 (예: 로그 남기기)
      if (response.success) {
        console.log("결제 성공 로직 실행");
      } else {
        console.error("결제 실패:", response.error_msg);
      }
      
      // 개별 컴포넌트에서 넘겨준 추가 콜백 실행
      if (callback) callback(response);
    });
  };

  return { requestPayment };
};

export default usePayment;