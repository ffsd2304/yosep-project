// src/App.jsx
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './assets/css/style.css';
import BottomTab from './components/common/BottomTab'; // 1. 탭 바 import
import CommonHeader from './components/common/CommonHeader'; // 헤더 가져오기
import Login from './components/login/Login';
import Main from './components/main/Main';
import ProductDetail from './components/product/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      {/* 1. 화면 전체 배경 (회색 등) */}
      <div className="all-wrapper">
        
        {/* 2. 실제 모바일 화면 틀 (중앙 정렬) */}
        <div className="mobile-container">
          
          <CommonHeader />

          <main className="content-area">
            <Routes>
              <Route path="/" element={<Navigate to="/store/login" />} />
              <Route path="/store/login" element={<Login />} />
              <Route path="/store/main" element={<Main />} />
              <Route path="/store/productDetail/:prodId" element={<ProductDetail />} />
            </Routes>
          </main>

          <BottomTab />

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;