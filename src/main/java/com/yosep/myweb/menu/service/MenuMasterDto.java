package com.yosep.myweb.menu.service;

import lombok.Data;
import java.util.List;

@Data
public class MenuMasterDto {
    private int masterId;      // 대분류 ID
    private String masterName; // 대분류 이름 (예: 신생아/유아)
    
    // ⭐ 중요: 상세 메뉴 리스트를 여기에 담습니다.
    private List<MenuDetailDto> subMenuList; 
}