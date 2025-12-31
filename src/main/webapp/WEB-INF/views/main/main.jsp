<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Yosep Service - Explore</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/product.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="/js/common.js"></script>
    
</head>
<body>
    <jsp:include page="../common/modal.jsp" />
    <div class="explore-container">
        <div class="swiper main-banner">
            <div class="swiper-wrapper">
                <c:forEach var="banner" items="${bannerList}">
                    <div class="swiper-slide">
                        <img src="${banner.imageUrl}${banner.fileName}">
                    </div>
                </c:forEach>
            </div>
            <div class="swiper-pagination"></div> 
        </div>

        <div class="category-section">
            <div class="slider-wrapper">
                <div class="category-slider">
                    <button class="chip active" data-category="">All</button>
                    <c:forEach var="cate" items="${categoryList}">
                        <button class="chip" data-category="${cate.detailCode}">${cate.detailName}</button>
                    </c:forEach>
                </div>
                <div class="slider-blur"></div>
            </div>

            <div class="filter-wrap">
                <div class="filter-btn" id="filterBtn">
                    <span class="filter-text">정렬</span>
                    <i class="filter-icon">▼</i>
                </div>
                <div class="sort-dropdown" id="sortDropdown">
                    <div class="sort-item active" data-sort="NEW">최신순</div>
                    <div class="sort-item" data-sort="PRICE_LOW">가격 낮은순</div>
                    <div class="sort-item" data-sort="PRICE_HIGH">가격 높은순</div>
                </div>
            </div>
        </div>
        <div id="product-content">
            <div class="loading-box" style="text-align:center; padding:50px;">
                <p>상품을 불러오는 중입니다...</p>
            </div>
        </div>
    </div>

    <script>
        /**
         * ==========================================
         * 1. 전역 변수 및 상태 관리
         * ==========================================
         */
        let currentCategory = "";
        let currentSortType = "";

        /**
         * ==========================================
         * 2. 페이지 초기화 (Entry Point)
         * ==========================================
         */
        $(document).ready(function() {
            initMainBanner();      // 배너 슬라이더 시작
            initCategorySlider();  // 카테고리 마우스 드래그 기능 시작
            initEventHandlers();   // 모든 클릭 이벤트 연결
            
            // 초기 데이터 로드 (전체 상품, 최신순)
            loadProducts(currentCategory, currentSortType);
        });

        /**
         * ==========================================
         * 3. 초기화 함수들 (Init Functions)
         * ==========================================
         */
        function initMainBanner() {
            new Swiper('.main-banner', { 
                pagination: { el: '.swiper-pagination', clickable: true },
                loop: true,
                autoplay: { delay: 3000, disableOnInteraction: false },
            });
        }

        function initCategorySlider() {
            const slider = document.querySelector('.category-slider');
            let isDown = false;
            let startX, scrollLeft;

            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                slider.classList.add('active');
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });

            slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
            slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
            
            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 2; // 스크롤 속도
                slider.scrollLeft = scrollLeft - walk;
            });
        }

        /**
         * ==========================================
         * 4. 이벤트 핸들러 모음 (Event Listeners)
         * ==========================================
         */
        function initEventHandlers() {
            // [카테고리 칩 클릭]
            $(".chip").click(function() {
                currentCategory = $(this).data("category");
                
                // UI 업데이트
                $(".chip").removeClass("active");
                $(this).addClass("active");

                // 데이터 요청
                loadProducts(currentCategory, currentSortType);
            });

            // [정렬 필터 버튼 토글]
            $("#filterBtn").click(function(e) {
                e.stopPropagation();
                $("#sortDropdown").toggle();
            });

            // [외부 클릭 시 드롭다운 닫기]
            $(document).click(function() {
                $("#sortDropdown").hide();
            });

            // [정렬 옵션 클릭]
            $(".sort-item").click(function() {
                currentSortType = $(this).data("sort");

                // UI 업데이트
                $(".sort-item").removeClass("active");
                $(this).addClass("active");
                $(".filter-text").text($(this).text());

                // 데이터 요청
                loadProducts(currentCategory, currentSortType);
            });
            
            // [상품 카드 클릭 - 상세 페이지 이동] (추후 구현 예정)
            // $(document).on('click', '.product-card', function() { ... });
        }

        /**
         * ==========================================
         * 5. 데이터 요청 함수 (AJAX)
         * ==========================================
         */
        function loadProducts(category, sortType) {
            // 로딩 중 UI 처리 (선택사항)

            $.ajax({
                url: "/product/list",
                type: "GET",
                data: { 
                    cateCode: category, 
                    sortType: sortType 
                },
                success: function(response) {
                    $("#product-content").html(response);
                },
                error: function(xhr, status, error) {
                    console.error("상품 로드 실패:", error);
                }
            });
        }
    </script>
</body>
</html>