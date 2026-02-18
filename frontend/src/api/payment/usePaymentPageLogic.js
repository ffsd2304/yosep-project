import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHeader } from '../../context/HeaderContext';
import { useModal } from '../../context/ModalContext';
import api from '../axios';
import useCommonCode from '../useCommonCode';
import usePayment from '../usePayment';

const usePaymentPageLogic = () => {
  const { requestPayment } = usePayment();
  const location = useLocation();
  const navigate = useNavigate();
  const { setHeader } = useHeader();
  const { openModal } = useModal();

  // 상태 관리
  const [isAddressMode, setIsAddressMode] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [deliveryRequest, setDeliveryRequest] = useState('');
  const [customRequest, setCustomRequest] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [selectedAddr, setSelectedAddr] = useState(null);

  // 데이터 수신
  const { orderItems } = location.state || { orderItems: [] };
  const selectedCategory = useCommonCode('DLVR_REQ_TYPE');
  const storedUser = sessionStorage.getItem('loginUser');
  const parsedUser = storedUser ? JSON.parse(storedUser) : {};

  // 초기화 및 계산 로직
  useEffect(() => {
    api.post('/api/addr/addresses', { defaultYn: 'Y' })
      .then(res => {
        if (res.data.status === 'SUCCESS' && res.data.addresses.length > 0) {
          setSelectedAddr(res.data.addresses[0]);
          setDeliveryRequest(res.data.addresses[0].dlvrReqCode || '');
        }
      })
      .catch(err => console.error('기본 배송지 로드 실패:', err));
  }, []);

  useEffect(() => {
    setHeader('주문/결제', true);
    if (!orderItems || orderItems.length === 0) {
      alert("구매할 상품 정보가 없습니다.");
      navigate(-1);
      return;
    }
    const total = orderItems.reduce((acc, item) => acc + (Number(item.prodPrice || 0) * Number(item.quantity || 1)), 0);
    const shipping = (total >= 50000 || total === 0) ? 0 : 3000;
    setTotalPrice(total);
    setShippingFee(shipping);
    setFinalAmount(total + shipping);
  }, [orderItems, navigate, setHeader]);

  // 결제 핸들러
  const handleOrder = () => {
    if (!termsAgreed) {
      openModal("알림", "구매 조건 및 약관에 동의해주세요.");
      return;
    }

    let orderName = orderItems[0].prodName;
    if (orderItems.length > 1) orderName += ` 외 ${orderItems.length - 1}건`;

    const orderData = {
      amount: finalAmount,
      name: orderName,
      buyer_name: parsedUser.userName,
      userId: parsedUser.userId,
      shippingFee,
      receiverName: selectedAddr ? selectedAddr.recipientName : parsedUser.userName,
      receiverAddr: selectedAddr ? `(${selectedAddr.zipCode}) ${selectedAddr.addrRoad} ${selectedAddr.addrDetail}` : '',
      receiverTel: selectedAddr ? selectedAddr.recipientPhone : '',
      orderItems: orderItems.map(item => ({ prodId: item.prodId, quantity: item.quantity, price: item.prodPrice }))
    };

    requestPayment(orderData, (response) => {
      const isSuccess = response.success || response.status === 'paid';
      const payload = { portoneResponse: { ...response, success: isSuccess }, userId: parsedUser.userId };
      
      api.post('/api/payment/complete', payload).catch(err => console.error("결제 결과 통보 실패:", err));

      if (isSuccess) {
        let deliveryMsg = deliveryRequest === 'R004' ? customRequest : (selectedCategory.find(item => item.detailCode === deliveryRequest)?.detailName || '');
        navigate('/store/paymentResult', {
          state: {
            ...response,
            amount: response.paid_amount,
            orderItems,
            buyer_name: payload.receiverName || parsedUser.userName,
            buyer_addr: payload.receiverAddr || (selectedAddr ? `(${selectedAddr.zipCode}) ${selectedAddr.addrRoad} ${selectedAddr.addrDetail}` : ''),
            buyer_tel: payload.receiverTel || (selectedAddr ? selectedAddr.recipientPhone : ''),
            custom_data: { message: deliveryMsg }
          }
        });
      } else {
        openModal("안내", `결제에 실패했습니다.\n${response.error_msg || ''}`);
      }
    });
  };

  // View에서 필요한 모든 데이터와 함수를 리턴
  return {
    state: { isAddressMode, orderItems, totalPrice, shippingFee, finalAmount, deliveryRequest, customRequest, termsAgreed, selectedAddr, selectedCategory },
    actions: { setIsAddressMode, setDeliveryRequest, setCustomRequest, setTermsAgreed, setSelectedAddr, handleOrder }
  };
};

export default usePaymentPageLogic;
