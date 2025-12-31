<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<div class="product-grid">
    <c:forEach var="prod" items="${productList}">
        <div class="product-card">
            <div class="product-img-box">
                <img src="${prod.imageUrl}${prod.fileName}"  alt="${prod.prodName}" onerror="this.src='/images/no-image.png'; this.onerror=null;">
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