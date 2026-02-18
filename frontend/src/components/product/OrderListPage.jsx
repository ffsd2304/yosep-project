import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios'; // API 호출을 위한 axios 인스턴스
import useCommonCode from '../../api/useCommonCode'; // 공통 코드 훅 import
import '../../assets/css/orderList.css'; // 새로 작성할 CSS
import { useHeader } from '../../context/HeaderContext';
import { useLoading } from '../../context/LoadingContext'; // 전역 로딩 훅

const OrderListPage = () => {
    const navigate = useNavigate();
    const { setHeader } = useHeader();
    const { showLoading, hideLoading } = useLoading(); // 로딩 제어 함수 가져오기

    // 주문 목록 상태
    const [orderList, setOrderList] = useState([]);
    
    // 필터 바텀시트 상태 및 옵션
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterPeriod, setFilterPeriod] = useState(6); // 기본값 6개월

    // 공통 코드 조회 (ORDER_PERIOD)
    const periodCodes = useCommonCode('ORDER_PERIOD');

    // API 데이터가 로드되면 매핑해서 사용하고, 로딩 중이거나 데이터가 없으면 기본값 사용
    const periodOptions = periodCodes && periodCodes.length > 0
        ? periodCodes.map(code => ({ label: code.detailName, value: Number(code.detailCode) }))
        : [
            { label: '최근 1개월', value: 1 }, { label: '최근 3개월', value: 3 }, { label: '최근 6개월', value: 6 }
        ];

    const handleSelectPeriod = (value) => {
        setFilterPeriod(value);
        setIsFilterOpen(false);
        // 추후 API 재호출 로직 추가 가능
    };

    useEffect(() => {
        // 1. 헤더 설정
        setHeader('주문/배송', true);
    }, []);

    useEffect(() => {
        // 2. 주문 내역 API 호출 (화면 진입 시 & 기간 변경 시 자동 실행됨)
        const fetchOrderList = async () => {
            showLoading(); // 로딩 시작
            try {
                const response = await api.post('/api/payment/orderList', { period: filterPeriod });
                if (response.data) {
                    setOrderList(response.data);
                }
            } catch (error) {
                console.error("주문 내역 조회 실패:", error);
            } finally {
                hideLoading(); // 로딩 종료
            }
        };

        fetchOrderList();
    }, [filterPeriod]);

    // 날짜 포맷팅 헬퍼
    const formatDate = (dateString) => {
        if (!dateString) return '';
        // DB Timestamp/ISO String -> "2026. 2. 5." 형식으로 변환
        const date = new Date(dateString);
        return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
    };

    return (
        <>
            <div className="order-list-wrap">
                
                {/* 2. 상단 주문 현황 대시보드 */}
                <div className="order-dashboard">
                    <div className="status-item active">
                        <span className="label">전체</span>
                        <span className="count">{orderList.length}</span>
                    </div>
                    <div className="status-item">
                        <span className="label">결제완료</span>
                        <span className="count">{orderList.filter(o => o.status === '결제완료').length}</span>
                    </div>
                    <div className="status-item">
                        <span className="label">배송준비중</span>
                        <span className="count">{orderList.filter(o => o.status === '배송준비중').length}</span>
                    </div>
                    <div className="status-item">
                        <span className="label">배송중</span>
                        <span className="count">0</span>
                    </div>
                    <div className="status-item">
                        <span className="label">배송완료</span>
                        <span className="count">0</span>
                    </div>
                </div>

                {/* 3. 기간 필터 및 안내 바 */}
                <div className="filter-bar">
                    <button className="date-select-btn" onClick={() => setIsFilterOpen(true)}>
                        {periodOptions.find(o => o.value === filterPeriod)?.label || '기간 조회'} 
                        <span className="arrow">∨</span>
                    </button>
                    <button className="guide-btn">안내 ＞</button>
                </div>

                {/* 4. 주문 내역 리스트 (타임라인 스타일) */}
                <div className="order-timeline-list">
                    
                    {orderList.length === 0 ? (
                        <div style={{ padding: '50px', textAlign: 'center', color: '#999' }}>
                            주문 내역이 없습니다.
                        </div>
                    ) : (
                        orderList.map((order, index) => (
                            <div className="timeline-item" key={order.orderNo || index}>
                                {/* 왼쪽 타임라인 데코레이션 */}
                                <div className="timeline-line">
                                    <div className="circle-icon"></div>
                                </div>

                                {/* 오른쪽 실제 컨텐츠 */}
                                <div className="timeline-content">
                                    <div className="date-header">
                                        <span className="label">주문일자</span>
                                        <span className="divider">|</span>
                                        <span className="date">{formatDate(order.orderDate)}</span>
                                    </div>

                                    <div className="order-card">
                                        <div className="card-header">
                                            <span className="status-text">{order.status}</span>
                                            <span className="detail-link" onClick={() => navigate(`/order/detail/${order.orderNo}`)}>주문상세 ＞</span>
                                        </div>

                                        {/* 상품 정보 */}
                                        <div className="product-info-area">
                                            <div className="thumb">
                                                <img 
                                                    src={order.productImg} 
                                                    alt="상품이미지" 
                                                    onError={(e) => e.target.src = '/images/no-image.png'}
                                                />
                                            </div>
                                            <div className="info">
                                                <div className="price-row">
                                                    <span className="sales-price">{order.totalAmount.toLocaleString()}원</span>
                                                </div>
                                                <div className="prod-name">{order.productName}</div>
                                                {/* 옵션 정보가 DB에 없다면 수량으로 대체 */}
                                                <div className="prod-option">
                                                    {order.option ? `옵션 : ${order.option}` : `수량 : ${order.quantity}개`}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 하단 버튼 그룹 */}
                                        <div className="card-buttons">
                                            <button className="btn-line-gray">주문취소</button>
                                            <button className="btn-fill-dark">장바구니담기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* ==========================================
                    3. 바텀 시트 (Portal)
                    질문하신 코드가 들어가는 위치입니다.
                    body에 렌더링되므로 어디에 두든 상관없지만, 
                    보통 return문 맨 마지막에 둡니다.
                   ========================================== */}
            {isFilterOpen && createPortal(
                <div className="bottom-sheet-backdrop" onClick={() => setIsFilterOpen(false)}>
                    <div className="bottom-sheet-container" onClick={(e) => e.stopPropagation()}>
                        
                        <div className="sheet-header">
                            <span className="sheet-title">기간조회 선택</span>
                            <button className="btn-sheet-close" onClick={() => setIsFilterOpen(false)}>
                                <img src="/images/icon/x-icon.png" alt="닫기" className="sheet-close-icon" />
                            </button>
                        </div>

                        <div className="filter-option-list">
                            {periodOptions.map((option) => (
                                <div 
                                    key={option.value}
                                    className={`filter-option-item ${filterPeriod === option.value ? 'selected' : ''}`}
                                    onClick={() => handleSelectPeriod(option.value)}
                                >
                                    <span>{option.label}</span>
                                    <span className="check-mark">✔</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default OrderListPage;