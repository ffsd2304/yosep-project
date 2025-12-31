package com.yosep.myweb.main.web; // 본인의 패키지명에 맞게 수정

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.yosep.myweb.banner.service.BannerDTO;
import com.yosep.myweb.code.service.CommonCodeDTO;
import com.yosep.myweb.common.util.LogUtil;
import com.yosep.myweb.main.service.HomeService;
import com.yosep.myweb.member.service.MemberDTO;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class HomeController {

    @Autowired
    HomeService homeService;

    @GetMapping("/")
    public String home(Model model) {
        return "home"; // home.jsp를 찾아가라는 뜻
    }

    @GetMapping("/login")
    public String loginPage(Model model) {
        String privacyTermCode = "C000000001"; // 로그인 약관 번호
        model.addAttribute("privacyTermCode", privacyTermCode);
        return "main/login"; // login.jsp로 이동
    }

    @GetMapping("/main")
    public String mainPage(HttpSession session, Model model) {
        // 세션에서 로그인한 유저 정보를 꺼내봅니다.
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");

        if (loginUser == null) {
            // 로그인 안 한 사용자가 주소창에 /main 쳐서 들어오려고 하면 로그인창으로 쫓아냅니다.
            return "redirect:/login"; 
        }
        HashMap<Object,Object> resultData = homeService.getMainData();
        LogUtil.printMapData("메인 페이지 통합 데이터", resultData);
        List<BannerDTO> bannerList = (List<BannerDTO>) resultData.get("bannerList");        //배너 리스트
        List<CommonCodeDTO> categoryList = (List<CommonCodeDTO>) resultData.get("categoryList");    //카테고리 리스트

        model.addAttribute("bannerList", bannerList);
        model.addAttribute("categoryList", categoryList);
        // 로그인한 사용자의 이름을 모델에 담아 화면에 전달합니다.
        model.addAttribute("userName", loginUser.getUserName());
        return "main/main"; // WEB-INF/views/main/main.jsp 실행
    }
}