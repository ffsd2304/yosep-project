package com.yosep.myweb.product.web;



import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.yosep.myweb.product.service.ProductDTO;
import com.yosep.myweb.product.service.ProductMapper;

@Controller
public class ProductController {

    @Autowired
    private ProductMapper productMapper; // 상품 매퍼

    // ProductController.java
    @GetMapping("/product/list")
    public String getProductAjaxList(@RequestParam Map<String, Object> params, Model model) {
        // 1. 카테고리에 맞는 데이터 조회
        List<ProductDTO> productList = productMapper.getProductList(params);
        model.addAttribute("productList", productList);
        
        // 2. 전체 페이지(main)가 아닌 "조각 파일"의 경로만 리턴!
        // 이렇게 하면 서버는 <html> 없이 <div>로 시작하는 상품 리스트만 딱 그려서 보냅니다.
        return "product/productListInc"; 
    }
}