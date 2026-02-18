import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import './assets/css/style.css';
import BottomTab from './components/common/BottomTab';
import CommonHeader from './components/common/CommonHeader';
import Loading from './components/common/Loading'; // 로딩 컴포넌트 재사용
import Login from './components/login/Login';
import { CartProvider } from './context/CartContext';
import { LoadingProvider } from './context/LoadingContext'; // 1. Provider import

// ✅ 코드 분할 (Lazy Loading) 적용
// 사용자가 해당 페이지에 접근할 때만 JS 파일을 다운로드합니다.
const StoreContainer = lazy(() => import('./components/common/StoreContainer'));
const OrderListPage = lazy(() => import('./components/product/OrderListPage'));
const PaymentPage = lazy(() => import('./components/product/PaymentPage'));
const PaymentResultPage = lazy(() => import('./components/product/PaymentResultPage'));
const ProductDetail = lazy(() => import('./components/product/ProductDetail'));

// ✅ 레이아웃 컴포넌트 정의
// 1. 메인 레이아웃: 헤더 + 콘텐츠(Outlet) + 하단 탭
const MainLayout = () => {
  return (
    <>
      <CommonHeader />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      {/* style.css에서 전역 패딩을 제거했으므로, 탭 높이만큼의 여백을 여기서 확보합니다. */}
      <div style={{ height: '65px' }}></div>
      <BottomTab />
    </>
  );
};

// 2. 서브 레이아웃: 헤더 + 콘텐츠(Outlet) (하단 탭 없음)
const SubLayout = () => {
  return (
    <>
      <CommonHeader />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
};

/**
 * ✅ 1. 실제 UI 레이아웃과 경로 감지 로직을 담은 컴포넌트
 * 이 컴포넌트는 BrowserRouter 내부에서 렌더링되므로 useLocation 사용이 가능합니다.
 */
function AppContent() {
  const navigate = useNavigate();

  const handleTabChange = (tabName) => {
    // ✅ 복잡한 상태 동기화 로직 제거 -> 오직 이동만 수행
    if (tabName === 'home') navigate('/store/main');
    else if (tabName === 'cart') navigate('/store/cart');
    else if (tabName === 'mypage') navigate('/store/mypage');
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
            {/* path="/store"로 설정하고 내부에서 Outlet으로 분기합니다. */}
            <Route path="/store" element={<CartProvider><Outlet /></CartProvider>}>
              
              {/* (A) 탭이 필요한 페이지들 (MainLayout 적용) */}
              <Route element={<MainLayout />}>
                {/* StoreContainer가 메인, 장바구니, 마이페이지 탭을 관리 */}
                <Route path="*" element={<StoreContainer onTabChange={handleTabChange} />} />
              </Route>

              {/* (B) 탭이 없어야 하는 페이지들 (SubLayout 적용) */}
              <Route element={<SubLayout />}>
                <Route path="productDetail/:prodId" element={<ProductDetail />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="paymentResult" element={<PaymentResultPage />} />
                <Route path="orderList" element={<OrderListPage />} />
              </Route>

            </Route>
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
      <LoadingProvider> {/* 2. 앱 전체를 감싸서 어디서든 로딩 사용 가능 */}
        <AppContent />
      </LoadingProvider>
    </BrowserRouter>
  );
}

export default App;