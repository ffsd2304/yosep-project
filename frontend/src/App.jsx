import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './assets/css/style.css';
import BottomTab from './components/common/BottomTab';
import CommonHeader from './components/common/CommonHeader';
import StoreContainer from './components/common/StoreContainer';
import Login from './components/login/Login';
import ProductDetail from './components/product/ProductDetail';
import PurchasePage from './components/product/PurchasePage';
import { CartProvider } from './context/CartContext';

/**
 * ✅ 1. 실제 UI 레이아웃과 경로 감지 로직을 담은 컴포넌트
 * 이 컴포넌트는 BrowserRouter 내부에서 렌더링되므로 useLocation 사용이 가능합니다.
 */
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // 탭 상태를 App 레벨로 끌어올림
  const [activeTab, setActiveTab] = useState(sessionStorage.getItem('storeActiveTab') || 'home');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    sessionStorage.setItem('storeActiveTab', tabName);
    
    // 상세페이지나 구매페이지에서 탭을 누르면 메인 컨테이너로 이동
    if (location.pathname.includes('productDetail') || location.pathname.includes('purchase')) {
      navigate('/store/main');
    }
  };

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
                    {/* 상세, 구매 페이지는 별도 라우트로 관리 (탭 바 위로 덮어씌워짐) */}
                    <Route path="productDetail/:prodId" element={<ProductDetail />} />
                    <Route path="purchase" element={<PurchasePage />} />
                    {/* 나머지 모든 경로는 StoreContainer가 탭(Main, Cart, MyPage)으로 처리 */}
                    <Route path="*" element={<StoreContainer activeTab={activeTab} onTabChange={handleTabChange} />} />
                  </Routes>
                  <BottomTab activeTab={activeTab} onTabChange={handleTabChange} />
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