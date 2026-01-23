package com.yosep.myweb.product.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductMapper {
    // 카테고리별 상품 목록 조회
    List<ProductDTO> getProductList(Map<String, Object> params);
    // 상품 상세 조회
    ProductDTO getProductInfo(String prodId);
    // 슬라이더 이미지 여러 개 가져오기
    List<ProductImgDTO> getSliderImages(String prodId);
    // 장바구니 추가/수정
    int upsertCart(CartDTO cartDTO);
    // 장바구니 목록 조회
    List<CartDTO> selectCartList(String userId);
    // 장바구니 목록 삭제
    int deleteCart(CartDTO cartDTO);
    // 찜하기 추가
    int insertWishList(WishListDTO dto);
    // 찜 해제 (삭제)
    int deleteWishList(WishListDTO dto);
}