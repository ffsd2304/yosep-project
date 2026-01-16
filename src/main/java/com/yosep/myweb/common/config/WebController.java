package com.yosep.myweb.common.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller // 👈 이게 꼭 있어야 합니다!
public class WebController {

    // "/store"로 시작하는 모든 요청을 index.html로 넘김
    @GetMapping("/store/**") 
    public String forwardReactPaths() {
        return "forward:/index.html";
    }
}