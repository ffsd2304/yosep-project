import { useNavigate } from 'react-router-dom'; // 1. 상단에 import
// 부모 컴포넌트(Main.jsx)로부터 상품 리스트(products)를 props로 받아옵니다.
const ProductList = ({ products }) => {
    const navigate = useNavigate(); // 2. navigate 함수 생성
    // 1. 숫자 포맷팅 함수 (JSTL fmt:formatNumber 대체)
    const formatPrice = (price) => {
        return price ? price.toLocaleString() : '0';
    };

    // 2. 상품 상세 이동 핸들러 (jQuery click 이벤트 대체)
    const handleProductClick = (prodId) => {
        console.log("클릭한 상품 ID (React):", prodId);
        if (prodId) {
            navigate(`/store/productDetail/${prodId}`);
        } else {
            alert("상품 정보를 찾을 수 없습니다.");
        }
    };

    // 3. 이미지 에러 핸들러 (onerror 대체)
    const handleImageError = (e) => {
        e.target.src = '/images/no-image.png';
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