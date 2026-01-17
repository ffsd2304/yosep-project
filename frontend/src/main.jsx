// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext';
import { HeaderProvider } from './context/HeaderContext'; // import
import { ToastProvider } from './context/ToastContext.jsx'; // import
import { ModalProvider } from './context/ModalContext'; // 방금 만든 파일 import


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 앱 전체를 모달 방송국으로 감쌉니다 */}
    <ModalProvider>
    <ToastProvider>
    <HeaderProvider>
    <CartProvider>
        <App />
    </CartProvider>
    </HeaderProvider>
    </ToastProvider>
    </ModalProvider>
  </React.StrictMode>,
)