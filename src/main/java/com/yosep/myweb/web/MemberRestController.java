package com.yosep.myweb.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.yosep.myweb.service.MemberDTO;
import com.yosep.myweb.service.MemberMapper;

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
}