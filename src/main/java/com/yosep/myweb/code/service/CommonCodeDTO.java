package com.yosep.myweb.code.service;

import lombok.Data;

@Data
public class CommonCodeDTO {
    // 1. CODE_MASTER 관련 필드
    private String masterCode;   // 마스터 코드 그룹
    private String masterName;   // 마스터 코드명
    private String masterDesc;   // 마스터 코드 상세 설명
    
    // 2. CODE_DETAIL 관련 필드
    private String detailCode;   // 상세 코드
    private String detailName;   // 상세 코드명
    private int sortOrder;       // 정렬 순서
    
    // 3. 공통 필드
    private String useYn;        // 사용 여부 (Y/N)
}