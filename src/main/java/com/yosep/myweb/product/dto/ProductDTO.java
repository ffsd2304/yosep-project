package com.yosep.myweb.product.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;

@Data
public class ProductDTO implements Serializable{
    // 클래스 버전 관리를 위한 ID (필드가 변경되어도 에러 방지)
    private static final long serialVersionUID = 1L;

    // --- [기존 컬럼들] ---
    private int prodId;        // 상품 일련번호 (DB: NUMBER)
    private String cateCode;   // 카테고리 코드
    private String prodName;   // 상품명
    private int prodPrice;     // 가격
    private String prodDesc;   // (목록용) 간단 설명
    private String fileName;   // (목록용) 대표 이미지 파일명
    private String imageUrl;   // 이미지 경로
    private String useYn;      // 사용여부
    private Date regDate;      // 등록일
    private double prodRating; // 별점
    private int reviewCount;   // 리뷰 수
    private String detailFileName; //상세이미지 파일 명
    private int stockCount;    // 재고 수량
    private int wishCount; // 상품의 총 찜 갯수
    private int isWished;  // 현재 유저의 찜 여부 (1:함, 0:안함)
}