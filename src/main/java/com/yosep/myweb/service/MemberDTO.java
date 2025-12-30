package com.yosep.myweb.service;

import lombok.Data;

@Data
public class MemberDTO {
    private String userId;
    private String userPw;
    private String userName;
    private String birthDate;
    private String genderCode;
    private String phoneNum;
    private String regDate; // 가입일
}