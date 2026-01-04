package com.yosep.myweb.product.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yosep.myweb.product.service.ProductDTO;
import com.yosep.myweb.product.service.ProductImgDTO;
import com.yosep.myweb.product.service.ProductMapper; // 또는 Service

import lombok.RequiredArgsConstructor;

@RestController // 데이터를 반환하는 컨트롤러임을 명시
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductRestController {

    private final ProductMapper productMapper;

    @GetMapping("/detail") // React 호출 주소: /api/product/detail?productId=2
    public Map<String, Object> getProductData(@RequestParam("prodId") String productId) {
        
        // 1. 기존 로직 그대로 사용
        ProductDTO product = productMapper.getProductInfo(productId);
        List<ProductImgDTO> sliderList = productMapper.getSliderImages(productId);
        
        // 2. 데이터를 담을 바구니(Map) 생성
        Map<String, Object> response = new HashMap<>();
        response.put("prod", product);
        response.put("sliderList", sliderList);
        
        return response; // 브라우저에 JSON 형태로 전달됨
    }
}