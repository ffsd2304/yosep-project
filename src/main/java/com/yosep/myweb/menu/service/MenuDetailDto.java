package com.yosep.myweb.menu.service;

import lombok.Data;

@Data
public class MenuDetailDto {
    private int detailId;      // 상세분류 ID
    private String detailName; // 상세분류 이름 (예: 유아완구)
    private String linkUrl;    // 이동할 URL
}