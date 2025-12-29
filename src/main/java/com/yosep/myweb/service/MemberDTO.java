package com.yosep.myweb.service;

import lombok.Data; // Lombok을 사용하면 Getter/Setter를 자동으로 만듭니다.

@Data
public class MemberDTO {
    private String userId;
    private String userName;
    private String userEmail;
}