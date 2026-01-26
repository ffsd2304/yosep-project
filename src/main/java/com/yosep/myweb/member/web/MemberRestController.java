package com.yosep.myweb.member.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yosep.myweb.member.service.MemberAddrDTO;
import com.yosep.myweb.member.service.MemberDTO;
import com.yosep.myweb.member.service.MemberService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController // 이 컨트롤러는 HTML이 아닌 데이터(JSON)만 보냅니다.
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberRestController {

    private final MemberService memberService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody MemberDTO memberDTO, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        
        // DB에서 회원 확인
        MemberDTO loginUser = memberService.login(memberDTO);

        if (loginUser != null) {
            // 로그인 성공 시 세션에 유저 정보 저장
            session.setAttribute("loginUser", loginUser);
            result.put("status", "SUCCESS");
        } else {
            // 로그인 실패
            result.put("status", "FAIL");
            result.put("message", "아이디 또는 비밀번호가 일치하지 않습니다.");
        }
        
        return result;
    }

    @PostMapping("/info")
    public Map<String, Object> info(HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");

        if (loginUser != null) {
            result.put("status", "SUCCESS");
            result.put("userId", loginUser.getUserId());
        } else {
            result.put("status", "FAIL");
        }
        return result;
    }

    @PostMapping("/addresses")
    public Map<String, Object> getAddressList(@RequestBody(required = false) MemberAddrDTO memberAddrDTO, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        // 세션에서 로그인된 유저 정보 가져오기
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");

        // 파라미터가 넘어오지 않았을 경우 객체 초기화 (NullPointerException 방지)
        if (memberAddrDTO == null) {
            memberAddrDTO = new MemberAddrDTO();
        }

        if (loginUser != null) {
            // 세션의 userId를 사용하여 배송지 목록 조회
            memberAddrDTO.setUserId(loginUser.getUserId());
            List<MemberAddrDTO> addresses = memberService.getAddressList(memberAddrDTO);
            result.put("status", "SUCCESS");
            result.put("addresses", addresses);
        } else {
            result.put("status", "FAIL");
            result.put("message", "로그인이 필요한 서비스입니다.");
        }
        
        return result;
    }
}