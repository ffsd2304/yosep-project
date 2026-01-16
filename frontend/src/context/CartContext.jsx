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
    setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
  };

  // 장바구니 삭제 함수
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. 쉽게 가져다 쓰기 위한 커스텀 훅
export const useCart = () => useContext(CartContext);