import { useEffect, useState } from 'react';
import { useHeader } from '../../context/HeaderContext';
import Main from '../main/Main';
import CartPage from '../product/CartPage';

const StoreContainer = ({ activeTab, onTabChange }) => {

    const { setHeader } = useHeader();

    // 2. 저장된 탭이 있다면 해당 탭도 방문한 것으로 처리 (그래야 화면이 보임)
    const [visited, setVisited] = useState({ 
        home: true, 
        cart: activeTab === 'cart', 
        mypage: activeTab === 'mypage' 
    }); 

    useEffect(() => {
        setVisited(prev => ({ ...prev, [activeTab]: true }));
    }, [activeTab]);

    // 탭이 바뀔 때마다 헤더 제목 다시 설정
    useEffect(() => {
        if (activeTab === 'home') {
            setHeader('Bot World', false);
        } else if (activeTab === 'cart') {
            setHeader('장바구니', true);
        } else if (activeTab === 'mypage') {
            setHeader('내 정보', true);
        }
    }, [activeTab, setHeader]);

    return (
        <div className="store-container">
            {/* 1. 홈 (Main) */}
            <div style={{ display: activeTab === 'home' ? 'block' : 'none' }}>
                {/* home은 초기값이 true이므로 항상 렌더링 되어 있음 */}
                {visited.home && <Main />}
            </div>

            {/* 2. 장바구니 (CartPage) */}
            <div style={{ display: activeTab === 'cart' ? 'block' : 'none' }}>
                {/* visited.cart가 true일 때만 렌더링 (Lazy Loading) */}
                {visited.cart && <CartPage onTabChange={onTabChange} />}
            </div>

            {/* 3. 내 정보 (MyPage) */}
            <div style={{ display: activeTab === 'mypage' ? 'block' : 'none' }}>
                {visited.mypage && (
                    // <MyPage /> 
                    <div style={{ padding: '20px', textAlign: 'center' }}>내 정보 페이지 준비중</div>
                )}
            </div>
        </div>
    );
};

export default StoreContainer;
