package com.yosep.myweb.member.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            result.put("loginUser", loginUser);
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
}