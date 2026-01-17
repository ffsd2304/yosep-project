// src/context/ToastContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
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