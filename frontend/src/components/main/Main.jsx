import { useEffect, useRef, useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import api from '../../api/axios'; // 설정해둔 axios 인스턴스
import '../../assets/css/product.css'; // 상품 관련 스타일 로드
import { useHeader } from '../../context/HeaderContext'; // 리모컨 가져오기

import ProductList from '../product/ProductList'; // 경로에 맞게 import

// Swiper 스타일 (npm install swiper 필요)
import 'swiper/css';
import 'swiper/css/pagination';

// 기존 CSS 파일이 index.html이나 App.js에 import 되어 있다고 가정합니다.
// import '../../assets/css/style.css';
// import '../../assets/css/product.css';

const Main = () => {
    // 1. 상태 관리 (State)
    const [banners, setBanners] = useState([]);      // 배너 목록
    const [categories, setCategories] = useState([]); // 카테고리 목록
    const [products, setProducts] = useState([]);     // 상품 목록
    
    const [activeCategory, setActiveCategory] = useState(''); // 현재 선택된 카테고리
    const [sortType, setSortType] = useState('');          // 현재 정렬 기준
    const [isSortOpen, setIsSortOpen] = useState(false);      // 정렬 드롭다운 토글
    const [loading, setLoading] = useState(false);

    // 드래그 스크롤을 위한 Ref
    const sliderRef = useRef(null);
    const { setHeader } = useHeader(); // 리모컨 기능 중 '설정하기' 가져옴

    useEffect(() => {
        // 화면이 열릴 때(마운트 될 때) 실행
        setHeader('Bot World', false); // 제목: Bot World, 뒤로가기: 숨김
    }, []);

    // 2. 초기 데이터 로드 (배너, 카테고리)
    useEffect(() => {
        const fetchInitData = async () => {
            try {
                // 백엔드에서 배너와 카테고리를 주는 API를 호출한다고 가정
                const res = await api.post('/api/main/main'); 
                setBanners(res.data.bannerList || []);
                setCategories(res.data.categoryList || []);
            } catch (err) {
                console.error("초기 데이터 로드 실패", err);
            }
        };
        fetchInitData();
    }, []);

    // 3. 상품 데이터 로드 (카테고리나 정렬이 바뀔 때마다 실행)
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                // 기존 JSP의 $.ajax 부분 대체
                // 주의: 백엔드가 이제 HTML이 아니라 JSON(상품 배열)을 반환해야 합니다!
                const res = await api.post('/api/product/list', {
                    cateCode: activeCategory,
                    sortType: sortType
                });
                setProducts(res.data || []);
            } catch (err) {
                console.error("상품 로드 실패", err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [activeCategory, sortType]);

    // 4. 카테고리 슬라이더 마우스 드래그 로직 (JQuery -> React Ref 변환)
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        const onMouseDown = (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };
        const onMouseLeave = () => {
            isDown = false;
            slider.classList.remove('active');
        };
        const onMouseUp = () => {
            isDown = false;
            slider.classList.remove('active');
        };
        const onMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // 스크롤 속도
            slider.scrollLeft = scrollLeft - walk;
        };

        // 이벤트 리스너 등록
        slider.addEventListener('mousedown', onMouseDown);
        slider.addEventListener('mouseleave', onMouseLeave);
        slider.addEventListener('mouseup', onMouseUp);
        slider.addEventListener('mousemove', onMouseMove);

        // 클린업 (컴포넌트 해제 시 리스너 제거)
        return () => {
            slider.removeEventListener('mousedown', onMouseDown);
            slider.removeEventListener('mouseleave', onMouseLeave);
            slider.removeEventListener('mouseup', onMouseUp);
            slider.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    // [추가] 상품 리스트 내 하트 클릭 시 로컬 상태 업데이트 함수
    // 서버 재조회 없이 프론트엔드 데이터만 즉시 변경하여 UI 반응성을 높임
    const handleWishToggle = (targetProdId) => {
        setProducts(prevProducts => 
            prevProducts.map(prod => 
                prod.prodId === targetProdId 
                    ? { ...prod, isWished: prod.isWished === 1 ? 0 : 1 } 
                    : prod
            )
        );
    };

    // 정렬 텍스트 표시용 헬퍼
    const getSortText = () => {
        if (sortType === 'PRICE_LOW') return '가격 낮은순';
        if (sortType === 'PRICE_HIGH') return '가격 높은순';
        return '최신순';
    };

    return (
        <div className="explore-container">
            {/* <CommonHeader title="Bot World" showBack={false}/> */}
            {/* 1. 메인 배너 (Swiper) */}
            <Swiper
                className="main-banner"
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <img src={`${banner.imageUrl}${banner.fileName}`} alt="banner" />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 2. 카테고리 섹션 */}
            <div className="category-section">
                <div className="slider-wrapper">
                    {/* ref 연결 */}
                    <div className="category-slider" ref={sliderRef}>
                        <button 
                            className={`chip ${activeCategory === '' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('')}
                        >
                            All
                        </button>
                        {categories.map((cate) => (
                            <button
                                key={cate.detailCode}
                                className={`chip ${activeCategory === cate.detailCode ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cate.detailCode)}
                            >
                                {cate.detailName}
                            </button>
                        ))}
                    </div>
                    <div className="slider-blur"></div>
                </div>

                {/* 3. 필터 섹션 */}
                <div className="filter-wrap">
                    <div 
                        className="filter-btn" 
                        id="filterBtn"
                        onClick={() => setIsSortOpen(!isSortOpen)}
                    >
                        <span className="filter-text">{getSortText()}</span>
                        <i className="filter-icon">▼</i>
                    </div>
                    
                    {/* 조건부 렌더링으로 토글 구현 */}
                    {isSortOpen && (
                        <div 
                            className="sort-dropdown" 
                            id="sortDropdown" 
                            style={{ display: 'block' }} // jQuery toggle 대신 직접 제어
                        >
                            <div 
                                className={`sort-item ${sortType === '' ? 'active' : ''}`}
                                onClick={() => { setSortType(''); setIsSortOpen(false); }}
                            >
                                최신순
                            </div>
                            <div 
                                className={`sort-item ${sortType === 'PRICE_LOW' ? 'active' : ''}`}
                                onClick={() => { setSortType('PRICE_LOW'); setIsSortOpen(false); }}
                            >
                                가격 낮은순
                            </div>
                            <div 
                                className={`sort-item ${sortType === 'PRICE_HIGH' ? 'active' : ''}`}
                                onClick={() => { setSortType('PRICE_HIGH'); setIsSortOpen(false); }}
                            >
                                가격 높은순
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 4. 상품 리스트 영역 */}
            <div id="product-content">
                <ProductList products={products} onWishToggle={handleWishToggle} />
            </div>
        </div>
    );
};

export default Main;