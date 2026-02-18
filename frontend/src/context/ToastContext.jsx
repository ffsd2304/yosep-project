// src/context/ToastContext.jsx
import { createContext, useContext, useRef, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const timer = useRef();

  const showToast = (message) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setToast({ visible: true, message });
    timer.current = setTimeout(() => {
      // 메시지를 지우지 않고 visible만 false로 변경 (페이드아웃 효과 유지)
      setToast((prev) => ({ ...prev, visible: false }));
    }, 1500);
  };

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      {children}
      {/* 토스트 UI를 여기에 두거나 BottomTab에서 사용합니다 */}
      <div className={`toast-message ${toast.visible ? 'show' : ''}`}>
        {toast.message}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);