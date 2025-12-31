package com.yosep.myweb.banner.service;

import lombok.Data;

@Data
public class BannerDTO {
    /** 배너 고유 일련번호 (PK) */
    private int bannerSeq;

    /** 배너 파일명 */
    private String fileName;
    
    /** 배너 이미지 저장 경로 (예: /images/banner1.jpg) */
    private String imageUrl;
    
    /** 배너 위에 표시될 텍스트 문구 */
    private String bannerText;
    
    /** 배너 노출 순서 (낮은 숫자가 먼저 노출됨) */
    private int sortOrder;
    
    /** 사용 여부 (Y: 노출, N: 비노출) */
    private String useYn;
}