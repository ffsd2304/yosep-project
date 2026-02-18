package com.yosep.myweb.product.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.yosep.myweb.member.dto.MemberDTO;
import com.yosep.myweb.product.dto.ProductDTO;
import com.yosep.myweb.product.dto.ProductImgDTO;
import com.yosep.myweb.product.service.ProductService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController // 데이터를 반환하는 컨트롤러임을 명시
@RequestMapping("/api/product")
@RequiredArgsConstructor
@Slf4j
public class ProductRestController {
    // [조언] 실무에서는 Map 대신 DTO를 사용하는 것이 유지보수에 훨씬 유리합니다.
    // 현재는 예시를 위해 기존 로직을 유지하되, 주석으로 개선 방향을 남깁니다.

    private final ProductService productService;

    /**
     * 상품 리스트 API
     * @map 
     */
    @PostMapping("/list") // API 경로 구분 권장
    @ResponseBody // 👈 이게 있어야 HTML이 아니라 JSON 데이터가 나갑니다.
    public List<ProductDTO> getProductList(@RequestBody Map<String,Object> map, HttpSession session) {
        
        // [보완 포인트 1] 반복되는 세션 추출 로직
        // 실무라면 @LoginUser 같은 어노테이션을 만들어 ArgumentResolver로 처리합니다.
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");
        String userId = (loginUser != null) ? loginUser.getUserId() : null;
        map.put("userId", userId);

        // 1. 서비스에서 데이터를 가져옵니다.
        List<ProductDTO> list = productService.getProductList(map);
        // 2. 리스트(데이터) 자체를 바로 리턴합니다.
        return list; 
    }
    

    @PostMapping("/detail") // React 호출 주소: /api/product/detail?productId=2
    @ResponseBody // 👈 이게 있어야 HTML이 아니라 JSON 데이터가 나갑니다.
    public Map<String, Object> getProductData(@RequestBody Map<String, String> params) {
        // [보완 포인트 2] 요청 파라미터 검증
        // Map으로 받으면 "prodId"가 오타로 "productId"로 들어왔을 때 찾기 힘듭니다.
        // Request DTO 객체를 사용하면 컴파일 단계에서 잡을 수 있습니다.
        String productId =  params.get("prodId");
        log.info("productId : " + productId );
        // 1. 기존 로직 그대로 사용
        ProductDTO product = productService.getProductInfo(productId);
        List<ProductImgDTO> sliderList = productService.getSliderImages(productId);
        
        // 2. 데이터를 담을 바구니(Map) 생성
        Map<String, Object> response = new HashMap<>();
        response.put("prod", product);
        response.put("sliderList", sliderList);
        
        return response; // 브라우저에 JSON 형태로 전달됨
    }

}