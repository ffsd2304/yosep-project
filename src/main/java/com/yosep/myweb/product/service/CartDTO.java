package com.yosep.myweb.product.service;

import lombok.Data;

@Data
public class CartDTO {
    private int cartSeq;
    private String userId;     // glglfkr8564
    private int prodId;        // 1
    private String prodName;   // 헬로카봇 에이스 X
    private int prodPrice;     // 45000
    private String prodDesc;   // 변신 자동차 에이스 X 모델
    private int quantity;      // 1
    private String fileName;   // carbot_ace.jpg
    private String imageUrl;   // /images/product/
    private String checked;    // Y/N

    // 기본 생성자 (Jackson JSON 변환 및 MyBatis용)
    public CartDTO() {}

    // Getter / Setter (생략 - Lombok @Data 사용 권장)
}