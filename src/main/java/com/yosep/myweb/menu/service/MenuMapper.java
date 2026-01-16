package com.yosep.myweb.menu.service; // 1. 변경된 패키지 경로

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MenuMapper {
    // XML의 <select id="getMenuList"> 와 이름이 같아야 함
    List<MenuMasterDto> getMenuList();
}