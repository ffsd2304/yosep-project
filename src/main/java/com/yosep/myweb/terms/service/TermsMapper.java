package com.yosep.myweb.terms.service;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TermsMapper {
    /**
     * 약관분류번호(termCatSeq)를 기반으로 사용 중인 약관 정보를 조회합니다.
     */
    TermsDTO getTerms(String termCatSeq);
}