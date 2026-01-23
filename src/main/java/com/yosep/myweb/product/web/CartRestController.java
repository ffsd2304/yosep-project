package com.yosep.myweb.product.web;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.yosep.myweb.member.service.MemberDTO;
import com.yosep.myweb.product.service.CartDTO;
import com.yosep.myweb.product.service.ProductService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController // 데이터를 반환하는 컨트롤러임을 명시
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartRestController {

    private final ProductService productService;
    
    // 장바구니 목록 API
    @PostMapping("/list")
    @ResponseBody
    public List<CartDTO> selectCartList(HttpSession session) {
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");
        String userId = (loginUser != null) ? loginUser.getUserId() : null;
        return productService.selectCartList(userId);
    }

    // 장바구니 추가/수정 API
    @PostMapping("/update")
    @ResponseBody
    public int upsertCart(@RequestBody CartDTO cartDTO, HttpSession session) {
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");
        if (loginUser != null) {
            cartDTO.setUserId(loginUser.getUserId());
        }
        return productService.upsertCart(cartDTO);
    }
    
    // 장바구니 삭제 API
    @PostMapping("/delete")
    @ResponseBody
    public int deleteCart(@RequestBody CartDTO cartDTO, HttpSession session) {
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");
        if (loginUser != null) {
            cartDTO.setUserId(loginUser.getUserId());
        }
        return productService.deleteCart(cartDTO);
    }
}
