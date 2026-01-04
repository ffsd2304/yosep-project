// src/components/ProductDetail.jsx
import { useEffect, useState } from 'react';

const ProductDetail = () => {
    // 1. 상태 관리 (JSP의 ${prod} 역할을 함)
    const [product, setProduct] = useState(null);
    const [sliderList, setSliderList] = useState([]);

    const BASE_URL = "http://localhost:8080";

    // 2. 서버에서 데이터 가져오기 (컴포넌트가 나타날 때 딱 한 번 실행)
    useEffect(() => {
        const prodId = 2;
        fetch('http://localhost:8080/api/product/detail?prodId='+prodId)
            .then(res => res.json())
            .then(data => {
                setProduct(data.prod);
                setSliderList(data.sliderList);
            })
            .catch(err => console.error("데이터 로딩 실패!", err));
    }, []);

    if (!product) return <div>로딩 중...</div>;

    return (
        <div className="product-detail-wrap">
            {/* 상단 제목 */}
            <h1>{product.prodName}</h1>
            
            {/* 가격 정보 */}
            <div className="price-container">
                <span className="price">{product.prodPrice.toLocaleString()}원</span>
            </div>

            {/* 상세 이미지 (아까 만든 통이미지) */}
            <div className="detail-img-area">
                <img src={`${BASE_URL}${product.imageUrl}${product.detailFileName}`} alt="상세설명" style={{width: '100%'}} />
            </div>
        </div>
    );
};

export default ProductDetail;