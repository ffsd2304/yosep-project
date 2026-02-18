import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import '../../assets/css/myPage.css';
import { useHeader } from '../../context/HeaderContext';
import ShippingAddress from '../address/ShippingAddress';

const MyPage = () => {
    const { setHeader } = useHeader();
    const navigator = useNavigate();
    
    const [statusCounts, setStatusCounts] = useState({
        paid: 0,
        preparing: 0,
        shipping: 0,
        delivered: 0,
        cancelled: 0
    });
    const [isAddressMode, setIsAddressMode] = useState(false);

    // 1. 화면 진입 시 헤더 설정 (UI 설정 - 의존성 setHeader)
    useEffect(() => {
        setHeader('MY쇼핑', false);
    }, [setHeader]);

    // 2. 주문 내역 조회 (데이터 로딩 - 마운트 시 1회만 실행)
    useEffect(() => {
        api.post('/api/payment/orderList', { period: 6 })
            .then(res => {
                if (res.data) {
                    const counts = { paid: 0, preparing: 0, shipping: 0, delivered: 0, cancelled: 0 };
                    res.data.forEach(item => {
                        // DB Mapper 설정에 따라 키값이 대문자(ORDER_STATUS)일 수 있으므로 둘 다 체크
                        const status = item.orderStatus || item.ORDER_STATUS;
                        if (status === 'PAID') counts.paid++;
                        else if (status === 'CANCELLED') counts.cancelled++;
                        // 추후 배송 상태(PREPARING, SHIPPING 등)가 추가되면 이곳에 로직 추가
                    });
                    setStatusCounts(counts);
                }
            })
            .catch(err => console.error("주문 내역 로드 실패:", err));
    }, []);

    return (
        <>
            {/* 배송지 관리 모달 (PaymentPage와 동일한 방식) */}
            {isAddressMode && (
                <ShippingAddress 
                    onBack={() => setIsAddressMode(false)}
                />
            )}
            <div className="mypage-wrapper">
            {/* 1. 유저 정보 영역 */}
            <section className="user-info-section">
                <div className="user-greeting">
                    <span className="name">박요셉 님</span>
                    <p className="sub-text">KB Pay 쇼핑에서 득템하세요!</p>
                </div>

                <div className="point-coupon-box">
                    <div className="pc-item">
                        <span className="label">포인트리</span>
                        <span className="value">37P</span>
                    </div>
                    <div className="divider"></div>
                    <div className="pc-item">
                        <span className="label">쇼핑쿠폰</span>
                        <span className="value">0개</span>
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>

            {/* 2. 주문/배송 현황 */}
            <section className="order-status-section">
                <div className="section-title-row">
                    <span className="title" onClick={() => navigator('/store/orderList')}>주문/배송</span>
                    <span className="arrow-icon">›</span>
                </div>
                
                <div className="status-steps">
                    {/* 뒷배경 점선 */}
                    <div className="dashed-line"></div>

                    {/* 각 단계 (active 클래스로 색상 제어) */}
                    <div className={`step-item ${statusCounts.paid > 0 ? 'active' : ''}`}>
                        <div className="circle">{statusCounts.paid}</div>
                        <span className="text">결제완료</span>
                    </div>
                    <div className="step-item">
                        <div className="circle">0</div>
                        <span className="text">배송준비중</span>
                    </div>
                    <div className="step-item">
                        <div className="circle">0</div>
                        <span className="text">배송중</span>
                    </div>
                    <div className="step-item">
                        <div className="circle">0</div>
                        <span className="text">배송완료</span>
                    </div>
                </div>
            </section>

            <div className="thin-divider"></div>

            {/* 3. 취소/교환/반품 */}
            <section className="claim-section">
                <div className="section-title-row">
                    <span className="title">취소/교환/반품</span>
                    <span className="arrow-icon">›</span>
                </div>
                <div className="claim-stats">
                    <div className="claim-item">취소 <b>{statusCounts.cancelled}</b></div>
                    <div className="claim-divider">|</div>
                    <div className="claim-item">교환 <b>0</b></div>
                    <div className="claim-divider">|</div>
                    <div className="claim-item">반품 <b>0</b></div>
                </div>
            </section>

            <div className="gray-spacer"></div>

            {/* 4. 최근 본 상품 */}
            <section className="recent-view-section">
                <div className="section-title-row">
                    <span className="title">최근 본 상품</span>
                    <span className="arrow-icon">›</span>
                </div>
                <div className="recent-banner">
                    {/* 이미지 썸네일 (임시 박스) */}
                    <div className="thumb-box">
                        <img src="/images/sample_thumb.jpg" alt="상품" onError={(e) => e.target.style.display='none'} />
                    </div>
                    <div className="banner-text">
                        내가 본 상품 한번에 확인하세요
                    </div>
                </div>
            </section>

            <div className="gray-spacer"></div>

            {/* 5. 하단 메뉴 리스트 */}
            <ul className="menu-list">
                <li className="menu-item">
                    <span>상품 리뷰</span>
                    <span className="arrow">›</span>
                </li>
                <li className="menu-item">
                    <span>상품 문의</span>
                    <span className="arrow">›</span>
                </li>
                <li className="menu-item">
                    <span>쇼핑 1:1 문의</span>
                    <span className="arrow">›</span>
                </li>
                <li className="menu-item">
                    <span>관심상품</span>
                    <span className="arrow">›</span>
                </li>
                <li className="menu-item" onClick={() => setIsAddressMode(true)}>
                    <span>배송지 관리</span>
                    <span className="arrow">›</span>
                </li>
            </ul>
            </div>
        </>
    );
};

export default MyPage;