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
        let currentCategory = "";
        let currentSortType = "";
        document.addEventListener('DOMContentLoaded', function() {
            // 클래스명이 정확히 .main-banner 인지 확인하세요!
            const swiper = new Swiper('.main-banner', { 
                pagination: {
                    el: '.swiper-pagination', // HTML에 있는 클래스명과 똑같아야 함
                    clickable: true,
                },
                loop: true, // 2개 이상이므로 이제 루프가 가능합니다.
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
            });
        });
        $(document).ready(function() {
            // 초기 페이지 로딩 시 데이터 불러오기
            // 1. 페이지 로드 시 "전체(ALL)" 상품을 즉시 비동기로 가져옵니다.
            loadProducts("", "");
            categorySlider()

            // 2. 카테고리 칩 클릭 이벤트
            $(".chip").click(function() {
                currentCategory = $(this).data("category"); // 클릭한 카테고리
                
                $(".chip").removeClass("active");
                $(this).addClass("active");

                // 카테고리와 현재 정렬 상태를 함께 전달
                loadProducts(currentCategory, currentSortType);
            });
        });

        function loadProducts(category, sortType) {
            $.ajax({
                url: "/product/list",
                type: "GET",
                data: { cateCode: category , sortType : sortType},
                success: function(response) {
                    console.log(response);
                    $("#product-content").html(response);
                }
            });
        }

        // 필터 버튼 클릭 시 드롭다운 토글
        $("#filterBtn").click(function(e) {
            e.stopPropagation(); // 이벤트 전파 방지 (바깥 클릭 시 닫기 위해)
            $("#sortDropdown").toggle();
        });

        // 화면 다른 곳 클릭 시 드롭다운 닫기
        $(document).click(function() {
            $("#sortDropdown").hide();
        });

        // 정렬 항목 클릭 시
        $(".sort-item").click(function() {
            // 1. 전역 변수 currentSortType 업데이트 (이 부분이 핵심입니다!)
            currentSortType = $(this).data("sort"); 

            // 2. UI 변경: 활성 상태 표시
            $(".sort-item").removeClass("active");
            $(this).addClass("active");
            
            // 3. UI 변경: 버튼 텍스트를 선택한 항목 이름으로 교체
            $(".filter-text").text($(this).text());
            
            // 4. AJAX 호출: 업데이트된 카테고리와 정렬값 전송
            loadProducts(currentCategory, currentSortType);
        });

        function categorySlider(){
            const slider = document.querySelector('.category-slider');
            let isDown = false;
            let startX;
            let scrollLeft;

            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                slider.classList.add('active');
                // 클릭한 위치 계산
                startX = e.pageX - slider.offsetLeft;
                // 현재 스크롤 위치 저장
                scrollLeft = slider.scrollLeft;
            });

            slider.addEventListener('mouseleave', () => {
                isDown = false;
            });

            slider.addEventListener('mouseup', () => {
                isDown = false;
            });

            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return; // 마우스를 누른 상태가 아니면 종료
                e.preventDefault();
                // 마우스가 움직인 거리 계산
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 2; // 스크롤 속도 조절 (2배속)
                slider.scrollLeft = scrollLeft - walk;
            });
        }
    </script>
</body>
</html>