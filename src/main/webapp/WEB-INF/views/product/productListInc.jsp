<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<div class="product-grid">
    <c:forEach var="prod" items="${productList}">
        <div class="product-card clickable-card" data-prod-id="${prod.prodId}">
            <div class="product-img-box">
                <img src="${prod.imageUrl}${prod.fileName}" alt="${prod.prodName}" onerror="this.src='/images/no-image.png'; this.onerror=null;">
            </div>
            <div class="product-detail">
                <div class="product-title">${prod.prodName}</div>
                <div class="product-price-tag">
                    <fmt:formatNumber value="${prod.prodPrice}" pattern="#,###" />원
                </div>
            </div>
        </div>
    </c:forEach>
</div>

<script>
    // $(document).on 대신 $('.product-card').on 을 사용합니다.
    // "지금 이 화면에 그려진 카드들"에게만 이벤트를 붙이는 방식입니다.
    $('.product-card').on('click', function() {
        
        let prodId = $(this).data('prod-id');
        
        console.log("클릭한 상품 ID (Inc 내부 스크립트):", prodId);

        if(prodId) {
            location.href = "/product/detail?productId=" + prodId;
        } else {
            alert("상품 정보를 찾을 수 없습니다.");
        }
    });
</script>