package com.yosep.myweb.product.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.yosep.myweb.product.service.ProductDTO;
import com.yosep.myweb.product.service.ProductImgDTO;
import com.yosep.myweb.product.service.ProductMapper;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class ProductController {

    @Autowired
    private ProductMapper productMapper;

    // 1. 상품 리스트 조각 가져오기 (기존 코드)
    @GetMapping("/product/list")
    public String getProductAjaxList(@RequestParam Map<String, Object> params, Model model) {
        List<ProductDTO> productList = productMapper.getProductList(params);
        model.addAttribute("productList", productList);
        return "product/productListInc"; 
    }

    // ▼▼▼ [새로 추가] 상세 페이지로 이동하는 메서드 ▼▼▼
    @GetMapping("/product/detail")
    public String getProductDetail(@RequestParam(value = "productId", required = false) String productId, Model model) {
        
        // 나중에 DB 연결할 때 이곳에 로직을 추가하면 됩니다.
        ProductDTO product = productMapper.getProductInfo(productId);
        
        // 2. 슬라이더 이미지들 가져오기
        List<ProductImgDTO> sliderList = productMapper.getSliderImages(productId);
        
        // 3. 화면으로 각각 보냄
        model.addAttribute("prod", product);       // ${prod} 로 사용
        model.addAttribute("sliderList", sliderList); // ${sliderList} 로 사용
        
        // /WEB-INF/views/product/productDetail.jsp 파일을 찾아갑니다.
        return "product/productDetail";
    }
}