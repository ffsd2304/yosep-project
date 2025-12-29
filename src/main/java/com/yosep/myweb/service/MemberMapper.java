package com.yosep.myweb.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    List<MemberDTO> getAllMembers(); // 모든 회원 정보를 가져오는 메서드
    void insertMember(MemberDTO memberDTO); // 저장용 (추가)
}