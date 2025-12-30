package com.yosep.myweb.terms.service;

import lombok.Data;

@Data
public class TermsDTO {
    private String termSeq;
    private String termCatSeq;
    private String termTitle;
    private String termContent; // CLOB은 자바에서 String으로 매핑됩니다.
    private String useYn;
}