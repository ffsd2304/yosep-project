import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/axios';
import { useModal } from "./ModalContext";
import { useToast } from "./ToastContext";
// 1. Context 생성
const CartContext = createContext();

// 2. Provider 컴포넌트 작성
export const CartProvider = ({ children }) => {
  const { openModal } = useModal();
  const { showToast } = useToast();
  const [cartItems, setCartItems] = useState([]);
  
  const [userId, setUserId] = useState(null);

  // 0. 사용자 정보 가져오기 (세션 체크)
  useEffect(() => {
    api.post('/api/member/info')
      .then(response => {
        if (response.data && response.data.status === 'SUCCESS') {
          setUserId(response.data.userId);
        }
      })
      .catch(() => {
        // 로그인되지 않은 상태이거나 에러 발생 시 무시 (userId는 null 유지)
      });
  }, []);

  // 1. 장바구니 목록 API 호출 (Mount 시)
  useEffect(() => {
    if (!userId) return;

    api.post('/api/cart/list', { userId })
    .then(response => {
      // DB 데이터에 UI 제어용 checked 속성 추가 (기본값 true)
      const data = response.data;
      setCartItems(data.map(item => ({ ...item, checked: true })));
    })
    .catch(err => console.error("장바구니 목록 로드 실패:", err));
  }, [userId]);

  // 장바구니 추가 함수
  const addToCart = async (product) => {
    // 1. 현재 장바구니(cartItems)에 같은 ID를 가진 상품이 있는지 확인
    // 주의: 기존 코드에서 item.id라고 하셨는데, 보통 product.prodId가 그대로 들어갔다면 item.prodId일 확률이 높습니다.
    const existingItem = cartItems.find((item) => item.prodId === product.prodId);

    if (existingItem) {
      // 2. 이미 존재한다면 알림을 띄우고
      openModal("안내", "이미 장바구니에 담긴 상품입니다.");
      // 3. 아무것도 하지 않고 함수를 여기서 끝냅니다 (return)
      return;
    }

    try {
      const res = await api.post('/api/cart/update', {
        userId,
        prodId: product.prodId,
        prodName: product.prodName,
        prodPrice: product.prodPrice,
        prodDesc: product.prodDesc,
        fileName: product.fileName,
        imageUrl: product.imageUrl,
        quantity: 1
      });

      if (res.status === 200) {
        showToast("장바구니에 담겼습니다.");
        // 4. 존재하지 않을 때만 실행됨: 새로 추가 (초기 수량 1)
        setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1, checked: true }]);
      }
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
    }
  };

  const removeFromCart = async (target) => {
    const idsToRemove = Array.isArray(target) ? target : [target];

    try {
      // 여러 개 삭제 처리를 위해 Promise.all 사용
      await Promise.all(idsToRemove.map(prodId => 
        api.post('/api/cart/delete', { userId, prodId })
      ));

      setCartItems((prevItems) => {
        return prevItems.filter((item) => !idsToRemove.includes(item.prodId));
      });
    } catch (error) {
      console.error("장바구니 삭제 실패:", error);
    }
  };

  /**
   * [추가] 장바구니 아이템 업데이트 함수
   * @param {number} prodId - 상품 ID
   * @param {object} newAttributes - 변경할 속성 (예: { checked: false } 또는 { quantity: 5 })
   */
  const updateCartItem = (prodId, newAttributes) => {
    setCartItems((prevItems) => 
      prevItems.map((item) => 
        item.prodId === prodId ? { ...item, ...newAttributes } : item
      )
    );

    // 수량이 변경된 경우 서버에 업데이트 요청
    if (newAttributes.quantity !== undefined) {
      api.post('/api/cart/update', {
        userId,
        prodId,
        quantity: newAttributes.quantity
      }).catch(err => console.error("수량 업데이트 실패:", err));
    }

    if (newAttributes.checked !== undefined) {
      api.post('/api/cart/update', {
        userId,
        prodId,
        checked: newAttributes.checked?'Y':'N'
      }).catch(err => console.error("체크 상태 업데이트 실패:", err));
    }
  };

  /**
   * [추가] 장바구니 전체 업데이트 함수 (전체 선택/해제용)
   */
  const updateAllCartItems = (newAttributes) => {
    setCartItems((prevItems) => 
      prevItems.map((item) => ({ ...item, ...newAttributes }))
    );
  };

  // [추가] 장바구니 금액 계산 (cartItems가 바뀔 때만 재계산)
  const { totalAmount, shippingFee, finalAmount } = useMemo(() => {
    const total = cartItems.reduce((acc, item) => {
      return item.checked ? acc + (Number(item.prodPrice || 0) * Number(item.quantity || 0)) : acc;
    }, 0);

    const shipping = (total === 0 || total >= 50000) ? 0 : 3000;
    const final = total + shipping;

    return { totalAmount: total, shippingFee: shipping, finalAmount: final };
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem, updateAllCartItems, totalAmount, shippingFee, finalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. 쉽게 가져다 쓰기 위한 커스텀 훅
export const useCart = () => useContext(CartContext);