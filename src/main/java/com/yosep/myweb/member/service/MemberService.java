package com.yosep.myweb.member.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;

    // 회원 가입
    public void registerMember(MemberDTO memberDTO) {
        memberMapper.insertMember(memberDTO);
    }

    // 로그인 체크
    public MemberDTO login(MemberDTO memberDTO) {
        return memberMapper.loginCheck(memberDTO);
    }

    // 전체 회원 목록 조회
    public List<MemberDTO> getAllMembers() {
        return memberMapper.getAllMembers();
    }

    // 회원의 배송지 목록 조회
    public List<MemberAddrDTO> getAddressList(MemberAddrDTO memberAddrDTO) {
        return memberMapper.selectMemberAddressList(memberAddrDTO);
    }

    // 회원의 배송지 목록 등록
    public int insertAddress(MemberAddrDTO memberAddrDTO) {
        return memberMapper.insertMemberAddress(memberAddrDTO);
    }

    // 회원의 배송지 삭제
    public int deleteAddress(MemberAddrDTO memberAddrDTO) {
        return memberMapper.deleteMemberAddress(memberAddrDTO);
    }
}