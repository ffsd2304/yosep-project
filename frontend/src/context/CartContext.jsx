import { createContext, useContext, useEffect, useState } from 'react';
import { useModal } from "./ModalContext";
// 1. Context 생성
const CartContext = createContext();

// 2. Provider 컴포넌트 작성
export const CartProvider = ({ children }) => {
  // 초기값: 로컬 스토리지에 데이터가 있으면 가져오고, 없으면 빈 배열([])
  const { openModal } = useModal();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('shopping_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 장바구니 데이터가 바뀔 때마다 로컬 스토리지에 자동 저장
  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 장바구니 추가 함수
  const addToCart = (product) => {
    // 1. 현재 장바구니(cartItems)에 같은 ID를 가진 상품이 있는지 확인
    // 주의: 기존 코드에서 item.id라고 하셨는데, 보통 product.prodId가 그대로 들어갔다면 item.prodId일 확률이 높습니다.
    const existingItem = cartItems.find((item) => item.prodId === product.prodId);

    if (existingItem) {
      // 2. 이미 존재한다면 알림을 띄우고
      openModal("안내", "이미 장바구니에 담긴 상품입니다.");
      // 3. 아무것도 하지 않고 함수를 여기서 끝냅니다 (return)
      return;
    }

    // 4. 존재하지 않을 때만 실행됨: 새로 추가 (초기 수량 1)
    setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 , checked : true}]);
  };

  const removeFromCart = (target) => {
  setCartItems((prevItems) => {
    // 1. 들어온 target이 배열인지 확인합니다.
    // 배열이 아니면(단일 ID면) 배열로 감싸줍니다. 예: 1 -> [1]
    const idsToRemove = Array.isArray(target) ? target : [target];

    // 2. 삭제할 ID 목록에 '포함되지 않은(!includes)' 상품만 남깁니다.
    return prevItems.filter((item) => !idsToRemove.includes(item.prodId));
  });
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
  };

  /**
   * [추가] 장바구니 전체 업데이트 함수 (전체 선택/해제용)
   */
  const updateAllCartItems = (newAttributes) => {
    setCartItems((prevItems) => 
      prevItems.map((item) => ({ ...item, ...newAttributes }))
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem, updateAllCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. 쉽게 가져다 쓰기 위한 커스텀 훅
export const useCart = () => useContext(CartContext);