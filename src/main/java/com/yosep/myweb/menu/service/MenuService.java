package com.yosep.myweb.menu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuService {

    @Autowired
    private MenuMapper menuMapper; // 메뉴 매퍼

    public List<MenuMasterDto> getMenuList(){
        return menuMapper.getMenuList();
    }

}
