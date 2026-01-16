package com.yosep.myweb.terms.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yosep.myweb.terms.service.TermsDTO;
import com.yosep.myweb.terms.service.TermsMapper;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/terms")
public class TermsRestController {

    @Autowired
    private TermsMapper termsMapper; // 새롭게 만든 Mapper 주입

    /**
     * 약관 분류 번호로 사용 중인 약관 1건을 조회합니다.
     * URL 예시: /api/terms/C000000001
     */
    @PostMapping("/terms") // 주소에서 변수를 뺍니다.
    public TermsDTO getTerms(@RequestBody TermsDTO termsDTO) { // @RequestBody로 데이터를 받습니다.
        // 전달받은 DTO 안에서 catSeq를 꺼내 조회합니다.
        log.info("test : " + termsDTO.toString());
        return termsMapper.getTerms(termsDTO.getTermCatSeq()); 
    }
}