import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './assets/css/style.css'; // 가장 먼저 로드하여 기본 베이스를 잡음
import Login from './components/login/Login';
import Main from './components/main/Main'; // 1. 메인 컴포넌트를 import 하세요.
import ProductDetail from './components/product/ProductDetail'; // 상품 상세 화면

function App() {
  return (
    <BrowserRouter> {/* 2. 전체를 BrowserRouter로 감싸야 합니다. */}
      <div className="App">
        {/* 네비게이션 바나 헤더를 넣으면 모든 페이지에서 공통으로 보입니다. */}
        
        <main>
          {/* 3. Routes가 주소창의 주소를 감시하다가 하나만 골라서 보여줍니다. */}
          <Routes>
            {/* 기본 주소일 때 로그인으로 보내기 */}
            <Route path="/" element={<Navigate to="/store/login" />} />
            
            {/* /login 주소일 때 Login 컴포넌트 */}
            <Route path="/store/login" element={<Login />} />
            
            {/* /main 주소일 때 Main 컴포넌트 */}
            <Route path="/store/main" element={<Main />} />
            {/* /productDetail 주소일 때 Main 컴포넌트 */}
            <Route path="/store/productDetail/:prodId" element={<ProductDetail />} />
          </Routes>
        </main>

        {/* 푸터를 넣으면 모든 페이지에서 공통으로 보입니다. */}
      </div>
    </BrowserRouter>
  );
}

export default App;