<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>상품 상세 페이지</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/product.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
</head>
<body>

    <div class="product-detail-wrap">
        
        <div class="product-slider-container swiper">
            <div class="swiper-wrapper">
            <c:choose>
                <%-- CASE 1: DB에서 가져온 이미지가 있을 경우 (List가 비어있지 않음) --%>
                <c:when test="${not empty sliderList}">
                    <c:forEach var="img" items="${sliderList}">
                        <div class="swiper-slide">
                            <%-- 경로 + 파일명 조합 --%>
                            <img src="${img.filePath}${img.originalName}" alt="상품 이미지">
                        </div>
                    </c:forEach>
                </c:when>

                <%-- CASE 2: 이미지가 없을 경우 (List가 비어있거나 null) --%>
                <c:otherwise>
                    <div class="swiper-slide">
                        <img src="https://placehold.co/600x600?text=Yogurt+1" alt="이미지1">
                    </div>
                    <div class="swiper-slide">
                        <img src="https://placehold.co/600x600?text=Yogurt+2" alt="이미지2">
                    </div>
                    <div class="swiper-slide">
                        <img src="https://placehold.co/600x600?text=Yogurt+3" alt="이미지3">
                    </div>
                </c:otherwise>
            </c:choose>
        </div>
            <div class="slider-dots swiper-pagination"></div>
        </div>

        <div class="product-info-section">
            
            <h1 class="product-title">${prod.prodName}</h1>

            <div class="rating-container">
                <div class="stars">
                    <fmt:formatNumber var="roundedRating" value="${prod.prodRating}" pattern="#" />
                    
                    <c:forEach begin="1" end="${roundedRating}">★</c:forEach>
                    
                    <c:forEach begin="1" end="${5 - roundedRating}">☆</c:forEach>
                </div>
                <span class="review-count">
                    <fmt:formatNumber value="${prod.prodRating}" pattern="0.0"/>점 
                    (${prod.reviewCount}개 상품평)
                </span>
            </div>

            <div class="price-container">
                <span class="discount-price">
                    <fmt:formatNumber value="${prod.prodPrice}" pattern="#,###" />원
                </span>
            </div>

            <div class="tab-container">
                <ul class="tabs">
                    <li class="tab-link current" data-tab="tab-1">상품설명</li>
                    <li class="tab-link" data-tab="tab-2">리뷰</li>
                    <li class="tab-link" data-tab="tab-3">Q&A</li>
                </ul>

                <div id="tab-1" class="tab-content current">
                    <div class="detail-content" style="text-align: center;"> <%-- 1. 텍스트 설명 (DB에 내용이 있을 때만 출력) --%>
                        <c:if test="${not empty prod.prodDesc}">
                            <div class="desc-text" style="text-align: left; padding: 10px 5px; line-height: 1.6; white-space: pre-wrap;">
                                ${prod.prodDesc}
                            </div>
                        </c:if>
                        <%-- 2. 이미지 분기 처리 --%>
                        <c:choose>
                            <%-- CASE A: DB에 상세 통이미지가 등록된 경우 --%>
                            <c:when test="${not empty prod.detailFileName}">
                                <img src="${prod.imageUrl}${prod.detailFileName}" alt="상세설명 이미지" style="width:100%; max-width:860px; margin-top:20px;">
                            </c:when>
                            <%-- CASE B: 상세 이미지가 없는 경우 (기존 샘플 유지) --%>
                            <c:otherwise>
                                <img src="https://placehold.co/600x400?text=Product+Description" alt="샘플 상세설명" style="width:100%; margin-top:20px;">
                            </c:otherwise>
                        </c:choose>
                    </div>
                </div>

                <div id="tab-2" class="tab-content">
                    <div class="review-area">
                        <p>아직 작성된 리뷰가 없습니다.</p>
                    </div>
                </div>

                <div id="tab-3" class="tab-content">
                    <div class="qna-area">
                        <p>상품에 대해 궁금한 점을 물어보세요.</p>
                    </div>
                </div>
            </div>
            
            <div class="action-buttons">
                <button class="cart-btn">장바구니 담기</button>
                <div class="button-divider"></div>
                <button class="buy-btn">바로구매</button>
            </div>

        </div>
    </div>

    <script>
        $(document).ready(function() {
            // Swiper 초기화 (JSP 충돌을 피하기 위해 설정을 객체로 전달)
            const swiper = new Swiper('.product-slider-container', {
                grabCursor: true,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                autoplay: false 
            });

            // 탭 클릭 이벤트
            $('ul.tabs li').click(function(){
                var tab_id = $(this).attr('data-tab');

                // 1. 모든 탭 버튼과 내용에서 'current' 클래스 제거
                $('ul.tabs li').removeClass('current');
                $('.tab-content').removeClass('current');

                // 2. 클릭한 탭과 그에 맞는 내용에 'current' 클래스 추가
                $(this).addClass('current');
                $("#"+tab_id).addClass('current');
            });

        });
    </script>
</body>
</html>