package com.yosep.myweb.member.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.yosep.myweb.member.service.MemberDTO;
import com.yosep.myweb.member.service.MemberMapper;

import jakarta.servlet.http.HttpSession;

@RestController // 이 컨트롤러는 HTML이 아닌 데이터(JSON)만 보냅니다.
public class MemberRestController {

    @Autowired
    private MemberMapper memberMapper;

    @GetMapping("/api/members") // 데이터 호출 주소를 별도로 분리합니다.
    public List<MemberDTO> getMembers() {
        return memberMapper.getAllMembers(); // 객체를 반환하면 자동으로 JSON이 됩니다.
    }

    // MemberRestController.java 에 추가
    @PostMapping("/api/members") // 데이터를 생성/저장할 때는 POST!
    public String insertMember(@RequestBody MemberDTO memberDTO) {
        int result = memberMapper.insertMember(memberDTO); // 결과 받기
        if (result > 0) {
            return "success"; // 1 이상이면 성공
        } else {
            return "fail";    // 0이면 저장 실패
        }
    }

    @PostMapping("/api/login")
    public Map<String, Object> login(@RequestBody MemberDTO memberDTO, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        
        // DB에서 회원 확인
        MemberDTO loginUser = memberMapper.loginCheck(memberDTO);

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
    }