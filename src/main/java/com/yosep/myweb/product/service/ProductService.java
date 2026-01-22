package com.yosep.myweb.product.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProductService {
    @Autowired
    private ProductMapper productMapper;

    public List<ProductDTO> getProductList(Map<String, Object> params) {
        return productMapper.getProductList(params);
    }
    // 상품 상세 조회
    public ProductDTO getProductInfo(String prodId) {
        return productMapper.getProductInfo(prodId);
    }
    // 슬라이더 이미지 여러 개 가져오기
    public List<ProductImgDTO> getSliderImages(String prodId) {
        return productMapper.getSliderImages(prodId);
    }

    // 장바구니 추가/수정
    public int upsertCart(CartDTO cartDTO) {
        log.info("ProductService.upsertCart called with CartDTO: {}", cartDTO);
        return productMapper.upsertCart(cartDTO);
    }
    // 장바구니 목록 조회
    public List<CartDTO> selectCartList(String userId) {
        return productMapper.selectCartList(userId);
    }
    // 장바구니 목록 삭제
    public int deleteCart(CartDTO cartDTO) {
        return productMapper.deleteCart(cartDTO);
    }
}
