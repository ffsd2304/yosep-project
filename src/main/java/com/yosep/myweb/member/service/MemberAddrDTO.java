package com.yosep.myweb.member.service;

import java.io.Serializable;

import lombok.Data;

@Data
public class MemberAddrDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private String userId;           // 사용자 ID
    private String userName;         // 사용자 이름 (JOIN 결과용)
    private Long addrSeq;            // 주소 일련번호
    private String addrTypeCode;     // 주소 유형 코드 (집, 회사 등)
    private String addrName;         // 주소 별칭
    private String recipientName;    // 수령인 이름
    private String recipientPhone;   // 수령인 연락처
    private String zipCode;          // 우편번호
    private String addrRoad;         // 도로명 주소
    private String addrJibun;        // 지번 주소
    private String addrDetail;       // 상세 주소
    private String addrDispDtcd;     // 주소 표시 구분 코드 (ROAD:도로명, JIBUN:지번)
    private String defaultYn;        // 기본 배송지 여부 (Y/N)
    private String regDate;          // 등록일
    private String modDate;          // 수정일
    private String dlvrReqCode;      // R001, R002...
    private String dlvrReqMessage;   // 직접입력 배송메모

    public MemberAddrDTO() {}
}