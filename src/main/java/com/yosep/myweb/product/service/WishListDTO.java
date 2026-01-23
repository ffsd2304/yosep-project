package com.yosep.myweb.product.service;

import java.util.Date;

import lombok.Data;

@Data
public class WishListDTO {
    private int wishId;       // WISH_ID
    private String userId;    // USER_ID
    private int prodId;       // PROD_ID
    private Date createDate;  // CREATE_DATE

    // 기본 생성자
    public WishListDTO() {}
}