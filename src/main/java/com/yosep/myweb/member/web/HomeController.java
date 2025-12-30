package com.yosep.myweb.member.web; // 본인의 패키지명에 맞게 수정

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        return "home"; // home.jsp를 찾아가라는 뜻
    }

    @GetMapping("/login")
    public String loginPage() {
        log.info("진입하였다.");
        return "main/login"; // login.jsp를 호출
    }
}