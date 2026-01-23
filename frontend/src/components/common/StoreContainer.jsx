import { useEffect, useState } from 'react';
import { useHeader } from '../../context/HeaderContext';
import Main from '../main/Main';
import CartPage from '../product/CartPage';
import BottomTab from './BottomTab';

const StoreContainer = () => {
    // 1. 세션 스토리지에서 저장된 탭 정보를 가져오거나 기본값 'home' 사용
    const savedTab = sessionStorage.getItem('storeActiveTab') || 'home';

    const [activeTab, setActiveTab] = useState(savedTab); // 현재 활성화된 탭
    
    // 2. 저장된 탭이 있다면 해당 탭도 방문한 것으로 처리 (그래야 화면이 보임)
    const [visited, setVisited] = useState({ 
        home: true, 
        cart: savedTab === 'cart', 
        mypage: savedTab === 'mypage' 
    }); 
    const { setHeader } = useHeader();

    // 탭 변경 핸들러
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        sessionStorage.setItem('storeActiveTab', tabName); // 탭 변경 시 상태 저장
        // 방문 기록 남기기 (처음 방문 시에만 컴포넌트가 마운트됨)
        setVisited(prev => ({ ...prev, [tabName]: true }));
    };

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
                {visited.cart && <CartPage onTabChange={handleTabChange} />}
            </div>

            {/* 3. 내 정보 (MyPage) */}
            <div style={{ display: activeTab === 'mypage' ? 'block' : 'none' }}>
                {visited.mypage && (
                    // <MyPage /> 
                    <div style={{ padding: '20px', textAlign: 'center' }}>내 정보 페이지 준비중</div>
                )}
            </div>

            {/* 하단 탭: 이제 navigate가 아니라 handleTabChange를 호출함 */}
            <BottomTab activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
    );
};

export default StoreContainer;
