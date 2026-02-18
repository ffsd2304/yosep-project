package com.yosep.myweb.product.dto;

import java.io.Serializable;

import lombok.Data; 

@Data
public class ProductImgDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int imgId;          // 이미지 고유 번호
    private int prodId;         // 상품 번호 (NUMBER 타입)
    private String filePath;    // 파일 경로 (/images/...)
    private String originalName;// 원본 파일명
    private String imgType;     // MAIN(대표) or SUB(추가)
    private int sortOrder;      // 순서
    private String imgCaption;
}