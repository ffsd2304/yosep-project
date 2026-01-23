package com.yosep.myweb.product.web;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.yosep.myweb.member.service.MemberDTO;
import com.yosep.myweb.product.service.ProductService;
import com.yosep.myweb.product.service.WishListDTO;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/wish")
@RequiredArgsConstructor
public class WishListRestController {
    private final ProductService productService;

    // 찜하기 추가 API
    @PostMapping("/insert")
    @ResponseBody
    public int insertWishList(@RequestBody WishListDTO wishListDTO, HttpSession session) {
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");
        wishListDTO.setUserId(loginUser.getUserId());
        return productService.insertWishList(wishListDTO);
    }

    // 찜하기 삭제 API
    @PostMapping("/delete")
    @ResponseBody
    public int deleteWishList(@RequestBody WishListDTO wishListDTO, HttpSession session) {
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");
        wishListDTO.setUserId(loginUser.getUserId());
        return productService.deleteWishList(wishListDTO);
    }
}
