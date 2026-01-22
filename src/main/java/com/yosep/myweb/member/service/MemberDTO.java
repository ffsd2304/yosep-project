package com.yosep.myweb.member.service;

import java.io.Serializable;

import lombok.Data;

@Data
public class MemberDTO implements Serializable{

    private static final long serialVersionUID = 1L; // 권장사항

    public MemberDTO() {}
    
    private String userId;
    private String userPw;
    private String userName;
    private String birthDate;
    private String genderCode;
    private String phoneNum;
    private String regDate; // 가입일
}