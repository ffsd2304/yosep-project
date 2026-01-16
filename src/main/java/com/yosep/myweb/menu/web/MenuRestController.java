package com.yosep.myweb.menu.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yosep.myweb.menu.service.MenuMasterDto;
import com.yosep.myweb.menu.service.MenuService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/menu")
public class MenuRestController {

    @Autowired
    MenuService menuService ;

    /**
     * 약관 분류 번호로 사용 중인 약관 1건을 조회합니다.
     * URL 예시: /api/terms/C000000001
     */
    @GetMapping("/menuList")
    public List<MenuMasterDto> getMenuList() {
        // DB에서 가져온 데이터를 바로 리턴하면
        // Jackson 라이브러리가 알아서 예쁜 JSON 계층 구조로 바꿔줍니다.
        return menuService.getMenuList();
    }
}