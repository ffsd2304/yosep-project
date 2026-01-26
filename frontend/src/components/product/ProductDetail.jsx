import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Swiper React 컴포넌트 임포트 (npm install swiper 필요)
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper 스타일 임포트
import 'swiper/css';
import 'swiper/css/pagination';
import api from '../../api/axios'; // 설정해둔 axios 인스턴스
import { useOrder } from '../../api/useOrder'; // 공통 구매 훅 import
import '../../assets/css/product.css'; // 상품 관련 스타일 로드
import { useCart } from '../../context/CartContext';
import { useHeader } from '../../context/HeaderContext'; // 리모컨 가져오기


const ProductDetail = () => {

    // prod: 상품 상세 정보 객체
    // sliderList: 슬라이더 이미지 배열
    const { prodId } = useParams();
    const { addToCart } = useCart(); // 아까 만든 훅 호출
    const { orderItems } = useOrder(); // 공통 구매 훅 호출

    const [prod, setProd] = useState(null);
    const [sliderList, setSliderList] = useState([]);
    const [quantity, setQuantity] = useState(1); // 수량 상태 추가
    const [activeTab, setActiveTab] = useState('tab-1');
    const {setHeader } = useHeader(); // 리모컨 기능 중 '설정하기' 가져옴
 

    useEffect(() => {
        // 화면이 열릴 때(마운트 될 때) 실행
        setHeader('상품 상세', true); // 제목: Bot World, 뒤로가기: 숨김
    }, []);

    useEffect(() => {
        const fetchInitProdData = async () => {
            try {
                // 백엔드에서 배너와 카테고리를 주는 API를 호출한다고 가정
                const res = await api.post('/api/product/detail',{
                    prodId : prodId
                }); 
                setProd(res.data.prod || null);
                setSliderList(res.data.sliderList || []);
            } catch (err) {
                console.error("초기 데이터 로드 실패", err);
            }
        };
        fetchInitProdData();
    }, [prodId]);

    // 수량 변경 핸들러
    const handleQuantityChange = (val) => {
        setQuantity(Math.max(1, quantity + val));
    };

    // 별점 계산을 위한 헬퍼 (JSTL forEach 대체)
    const renderStars = (rating) => {
        const roundedRating = Math.round(rating);
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(<span key={i}>{i < roundedRating ? '★' : '☆'}</span>);
        }
        return stars;
    };

    const handlerTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    // 바로구매 핸들러
    const handleBuyNow = () => {
        if (!prod) return;
        
        // 단일 상품을 배열 형태로 만들어서 전달
        const itemToBuy = [{
            prodId: prod.prodId,
            prodName: prod.prodName,
            prodPrice: prod.prodPrice,
            prodDesc: prod.prodDesc, // 데이터 일관성을 위해 추가
            quantity: quantity, // 선택한 수량 반영
            imageUrl: prod.imageUrl,
            fileName: prod.fileName
        }];
        
        orderItems(itemToBuy);
    };

    if (!prod) {
        return <div className="loading-container" style={{textAlign:'center', padding:'50px'}}>로딩 중...</div>;
    }
    return (
        <div className="product-detail-wrap">
            {/* 1. 상품 이미지 슬라이더 (Swiper) */}
            <div className="product-slider-container">
                <Swiper
                    modules={[Pagination]}
                    className="mySwiper product-swiper"
                    grabCursor={true}
                    loop={true}
                    pagination={{ clickable: true }}
                >
                    {/* CASE 1: 데이터가 있을 때 */}
                    {sliderList && sliderList.length > 0 ? (
                        sliderList.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img src={`${img.filePath}${img.originalName}`} alt="상품 이미지" />
                            </SwiperSlide>
                        ))
                    ) : (
                        /* CASE 2: 데이터가 없을 때 (기본 이미지) */
                        <>
                            <SwiperSlide>
                                <img src="https://placehold.co/600x600?text=Yogurt+1" alt="이미지1" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://placehold.co/600x600?text=Yogurt+2" alt="이미지2" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://placehold.co/600x600?text=Yogurt+3" alt="이미지3" />
                            </SwiperSlide>
                        </>
                    )}
                </Swiper>
            </div>

            {/* 2. 상품 정보 섹션 */}
            <div className="product-info-section">
                
                <h1 className="product-title">{prod.prodName}</h1>

                <div className="rating-container">
                    <div className="stars">
                        {renderStars(prod.prodRating)}
                    </div>
                    <span className="review-count">
                        {/* fmt:formatNumber 대체 (toFixed) */}
                        {prod.prodRating ? prod.prodRating.toFixed(1) : '0.0'}점 
                        ({prod.reviewCount}개 상품평)
                    </span>
                </div>

                <div className="price-container">
                    {prod.stockCount > 0 ? (
                        <span className="discount-price">
                            {prod.prodPrice ? prod.prodPrice.toLocaleString() : 0}원
                        </span>
                    ) : (
                        <span className="discount-price sold-out-text">
                            품절
                        </span>
                    )}
                </div>

                {/* 수량 선택 영역 추가 */}
                {prod.stockCount > 0 && (
                    <div className="quantity-selector-detail">
                        <span className="qty-label">수량</span>
                        <div className="qty-control">
                            <button onClick={() => handleQuantityChange(-1)}>−</button>
                            <input type="text" value={quantity} readOnly />
                            <button onClick={() => handleQuantityChange(1)}>+</button>
                        </div>
                        <span className="total-price-preview">
                            {(prod.prodPrice * quantity).toLocaleString()}원
                        </span>
                    </div>
                )}

                {/* 3. 탭 컨테이너 (Hook 없이 정적으로 Tab-1만 활성화 처리) */}
                <div className="tab-container">
                    <ul className="tabs">
                        {/* className="current"는 현재 선택된 탭을 의미함 */}
                        <li 
                            className={`tab-link ${activeTab === 'tab-1' ? 'current' : ''}`}
                            onClick={() => handlerTabChange('tab-1')}
                        >상품설명</li>
                        <li 
                            className={`tab-link ${activeTab === 'tab-2' ? 'current' : ''}`}
                            onClick={() => handlerTabChange('tab-2')}
                        >리뷰</li>
                        <li 
                            className={`tab-link ${activeTab === 'tab-3' ? 'current' : ''}`}
                            onClick={() => handlerTabChange('tab-3')}
                        >Q&A</li>
                    </ul>
                    {/* 탭 내용 1: 상품 설명 */}
                    <div className={`tab-content ${activeTab === 'tab-1' ? 'current' : ''}`}>
                        <div className="detail-content" style={{ textAlign: 'center' }}>
                            {/* 텍스트 설명이 있을 경우 */}
                            {prod.prodDesc && (
                                <div 
                                    className="desc-text" 
                                    style={{ 
                                        textAlign: 'left', 
                                        padding: '10px 5px', 
                                        lineHeight: '1.6', 
                                        whiteSpace: 'pre-wrap' 
                                    }}
                                >
                                    {prod.prodDesc}
                                </div>
                            )}

                            {/* 상세 이미지 분기 처리 */}
                            {prod.detailFileName ? (
                                <img 
                                    src={`${prod.imageUrl}${prod.detailFileName}`} 
                                    alt="상세설명 이미지" 
                                    style={{ width: '100%', maxWidth: '860px', marginTop: '20px' }} 
                                />
                            ) : (
                                <img 
                                    src="https://placehold.co/600x400?text=Product+Description" 
                                    alt="샘플 상세설명" 
                                    style={{ width: '100%', marginTop: '20px' }} 
                                />
                            )}
                        </div>
                    </div>

                    {/* 탭 내용 2: 리뷰 (숨김 처리됨) */}
                    <div className={`tab-content ${activeTab === 'tab-2' ? 'current' : ''}`}>
                        <div className="review-area">
                            <p>아직 작성된 리뷰가 없습니다.</p>
                        </div>
                    </div>

                    {/* 탭 내용 3: Q&A (숨김 처리됨) */}
                    <div className={`tab-content ${activeTab === 'tab-3' ? 'current' : ''}`}>
                        <div className="qna-area">
                            <p>상품에 대해 궁금한 점을 물어보세요.</p>
                        </div>
                    </div>
                </div>

                {/* 🔥 [핵심 추가] 버튼 높이만큼 빈 공간을 강제로 만들어주는 투명 박스 🔥 */}
                <div className="bottom-spacer" style={{ height: '80px' }}></div>
                
                {/* 4. 하단 버튼 영역 (Fixed) */}
                <div className="action-buttons"> {/* 탭 높이만큼 띄움 */}
                    <button className="cart-btn" onClick={() => {addToCart({ ...prod, quantity });}}>
                        장바구니 담기
                    </button>
                    <div className="button-divider"></div>
                    <button 
                        className={`buy-btn ${prod.stockCount <= 0 ? 'disabled' : ''}`}
                        disabled={prod.stockCount <= 0}
                        onClick={handleBuyNow}
                    >
                        바로구매
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;