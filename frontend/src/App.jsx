import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './assets/css/style.css';
import BottomTab from './components/common/BottomTab';
import CommonHeader from './components/common/CommonHeader';
import Login from './components/login/Login';
import Main from './components/main/Main';
import CartPage from './components/product/CartPage';
import ProductDetail from './components/product/ProductDetail';
import { CartProvider } from './context/CartContext'; // 가져오기

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
        
        <main className="content-area">
          <Routes>
            {/* 1. 장바구니가 필요 없는 경로 (Provider 밖) */}
            <Route path="/" element={<Navigate to="/store/login" />} />
            <Route path="/store/login" element={<Login />} />

            {/* 2. 장바구니가 필요한 경로들을 그룹화 (Provider 안) */}
            <Route
              path="/store/*"
              element={
                <CartProvider>
                  <CommonHeader />
                  <Routes>
                    <Route path="main" element={<Main />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="productDetail/:prodId" element={<ProductDetail />} />
                  </Routes>
                  <BottomTab />
                </CartProvider>
              }
            />
          </Routes>
        </main>
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