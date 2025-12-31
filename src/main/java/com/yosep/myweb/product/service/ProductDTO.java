package com.yosep.myweb.product.service;

import java.util.Date;

import lombok.Data;

@Data
public class ProductDTO {
    private int prodId;        // 상품 일련번호
    private String cateCode;   // 카테고리 코드
    private String prodName;   // 상품명
    private int prodPrice;     // 가격
    private String prodDesc;   // 설명
    private String fileName;   // 이미지 파일명
    private String imageUrl;   // 이미지 경로
    private String useYn;      // 사용여부
    private Date regDate;      // 등록일
}