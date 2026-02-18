// src/main.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { HeaderProvider } from './context/HeaderContext'; // import
import { ModalProvider } from './context/ModalContext'; // 방금 만든 파일 import
import { ToastProvider } from './context/ToastContext.jsx'; // import

// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 창 포커스 시 자동 갱신 비활성화 (필요에 따라 설정)
      staleTime: 1000 * 60,        // 1분간 데이터 신선함 유지 (API 호출 최소화)
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ModalProvider>
    <ToastProvider>
    <HeaderProvider>
        <App />
    </HeaderProvider>
    </ToastProvider>
    </ModalProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)