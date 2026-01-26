package com.yosep.myweb.member.service; // 1. 변경된 패키지 경로

import java.util.List;
// MemberDTO가 같은 패키지(com.yosep.myweb.member.service)에 있다면 import가 필요 없습니다.
// 만약 다른 패키지에 있다면 import com.yosep.myweb.member.service.MemberDTO; 를 추가해야 합니다.

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {

    /**
     * 전체 회원 조회: 시스템에 등록된 모든 회원 정보를 리스트로 가져옵니다.
     * @return List<MemberDTO> 회원 정보 리스트
     */
    List<MemberDTO> getAllMembers();

    /**
     * 회원 가입: 새로운 회원 정보를 데이터베이스에 저장합니다.
     * @param memberDTO 저장할 회원 정보 객체
     * @return int 성공 시 1, 실패 시 0 반환
     */
    int insertMember(MemberDTO memberDTO);
    
    /**
     * 로그인 체크: 아이디와 비밀번호가 일치하는 회원을 조회합니다.
     * @param memberDTO 로그인 시도 정보 (userId, userPw 담긴 객체)
     * @return MemberDTO 일치하는 회원 정보 (일치하지 않으면 null 반환)
     */
    MemberDTO loginCheck(MemberDTO memberDTO);

    /**
     * 회원의 배송지 목록 조회
     * @param userId 사용자 ID
     * @return List<MemberAddrDTO> 배송지 정보 리스트
     */
    List<MemberAddrDTO> selectMemberAddressList(MemberAddrDTO memberAddrDTO);

}