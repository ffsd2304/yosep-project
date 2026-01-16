import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './assets/css/style.css';
import BottomTab from './components/common/BottomTab';
import CommonHeader from './components/common/CommonHeader';
import Login from './components/login/Login';
import Main from './components/main/Main';
import CartPage from './components/product/CartPage';
import ProductDetail from './components/product/ProductDetail';

/**
 * ✅ 1. 실제 UI 레이아웃과 경로 감지 로직을 담은 컴포넌트
 * 이 컴포넌트는 BrowserRouter 내부에서 렌더링되므로 useLocation 사용이 가능합니다.
 */
function AppContent() {
  const location = useLocation();

  // 헤더를 숨길 경로를 정의합니다.
  const hideHeaderPaths = ['/store/login', '/'];
  const isLoginPage = hideHeaderPaths.includes(location.pathname);

  return (
    <div className="all-wrapper">
      <div className="mobile-container">
        
        {/* 로그인 페이지가 아닐 때만 헤더를 보여줍니다. */}
        {!isLoginPage && <CommonHeader />}

        <main className="content-area">
          <Routes>
            <Route path="/" element={<Navigate to="/store/login" />} />
            <Route path="/store/login" element={<Login />} />
            <Route path="/store/main" element={<Main />} />
            <Route path="/store/cart" element={<CartPage />} />
            <Route path="/store/productDetail/:prodId" element={<ProductDetail />} />
          </Routes>
        </main>

        {/* 탭바도 로그인 페이지에서는 숨기는 것이 일반적입니다. */}
        {!isLoginPage && <BottomTab />}

      </div>
    </div>
  );
}

/**
 * ✅ 2. 최상위 App 컴포넌트
 * 여기서는 Router로 감싸주는 역할만 수행합니다.
 */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;