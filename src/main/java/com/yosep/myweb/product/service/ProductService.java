package com.yosep.myweb.product.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
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
}
