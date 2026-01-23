import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. 상단에 import
import api from '../../api/axios'; // 설정해둔 axios 인스턴스
// 부모 컴포넌트(Main.jsx)로부터 상품 리스트(products)를 props로 받아옵니다.
const ProductList = ({ products, onWishToggle }) => {
    const navigate = useNavigate(); // 2. navigate 함수 생성
    // 중복 클릭 방지를 위해 처리 중인 상품 ID들을 저장하는 Set
    const [processingIds, setProcessingIds] = useState(new Set());

    // 1. 숫자 포맷팅 함수 (JSTL fmt:formatNumber 대체)
    const formatPrice = (price) => {
        return price ? price.toLocaleString() : '0';
    };

    // 2. 상품 상세 이동 핸들러 (jQuery click 이벤트 대체)
    const handleProductClick = (prodId) => {
        navigate(`/store/productDetail/${prodId}`);
    };

    // 3. 이미지 에러 핸들러 (onerror 대체)
    const handleImageError = (e) => {
        e.target.src = '/images/no-image.png';
    };

    // 찜하기 버튼 클릭 핸들러
    const handleWishClick = (e, prodId, isWished) => {
        e.stopPropagation(); // ⭐ 중요: 부모의 카드 클릭 이벤트(상세이동)가 발생하지 않도록 막음

        // 이미 처리 중인 상품이라면 클릭 무시 (Lock)
        if (processingIds.has(prodId)) return;
        setProcessingIds(prev => new Set(prev).add(prodId));

        const wishApiStr = isWished === 1 ? '/api/wish/delete' : '/api/wish/insert';
        api.post(wishApiStr, {
            prodId,
            isWished: isWished === 1 ? 0 : 1 // 현재 상태의 반대로 전송
        })
        .then(() => {
            // 서버 DB 업데이트 성공 시, 부모 컴포넌트의 로컬 상태도 변경해줍니다.
            if (onWishToggle) {
                onWishToggle(prodId);
            }
        })
        .catch(err => console.error("찜 상태 변경 실패:", err))
        .finally(() => {
            // 성공하든 실패하든 요청이 끝나면 목록에서 제거 (Unlock)
            setProcessingIds(prev => {
                const next = new Set(prev);
                next.delete(prodId);
                return next;
            });
        });
    };

    return (
        <div className="product-grid">
            {/* c:forEach 대체 -> map 함수 사용 */}
            {products && products.length > 0 ? (
                products.map((prod) => (
                    <div 
                        key={prod.prodId} 
                        className="product-card clickable-card" 
                        // data-prod-id는 굳이 필요 없지만, CSS 스타일링 등을 위해 남겨둘 수 있습니다.
                        data-prod-id={prod.prodId} 
                        onClick={() => handleProductClick(prod.prodId)}
                    >
                        <div className="product-img-box">
                            {/* 이미지 경로 조합 */}
                            <img 
                                src={`${prod.imageUrl}${prod.fileName}`} 
                                alt={prod.prodName} 
                                onError={handleImageError} 
                            />
                            {/* ⭐ 하트 버튼 추가 */}
                            <div 
                                className={`wish-icon-btn ${prod.isWished === 1 ? 'active' : ''}`}
                                onClick={(e) => handleWishClick(e, prod.prodId, prod.isWished)}
                            >
                                {prod.isWished === 1 ? '❤️' : '🤍'}
                            </div>
                        </div>
                        <div className="product-detail">
                            <div className="product-title">{prod.prodName}</div>
                            <div className="product-price-tag">
                                {/* 가격 포맷팅 적용 */}
                                {formatPrice(prod.prodPrice)}원
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                // 상품이 없을 경우 처리 (선택사항)
                <div style={{ width: '100%', textAlign: 'center', padding: '50px' }}>
                    등록된 상품이 없습니다.
                </div>
            )}
        </div>
    );
};

export default ProductList;