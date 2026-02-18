package com.yosep.myweb.main.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.yosep.myweb.banner.dto.BannerDTO;
import com.yosep.myweb.code.dto.CommonCodeDTO;
import com.yosep.myweb.main.service.HomeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController // 데이터를 반환하는 컨트롤러임을 명시
@RequestMapping("/api/main")
@RequiredArgsConstructor
@Slf4j
public class HomeRestController {

    private final HomeService homeService;

    /**
     * 메인화면 init 데이터 API
     * @map 
     */
    @PostMapping("/main") // API 경로 구분 권장
    @ResponseBody // 👈 이게 있어야 HTML이 아니라 JSON 데이터가 나갑니다.
    public Map<String,Object> getMainInitData() {

        Map<String,Object> returnData = new HashMap<String,Object>();
        // 1. 서비스에서 데이터를 가져옵니다.
        HashMap<Object,Object> resultData = homeService.getMainData();
        List<BannerDTO> bannerList = (List<BannerDTO>) resultData.get("bannerList");                //배너 리스트
        List<CommonCodeDTO> categoryList = (List<CommonCodeDTO>) resultData.get("categoryList");    //카테고리 리스트
        returnData.put("bannerList", bannerList);
        returnData.put("categoryList", categoryList);
        // 2. 리스트(데이터) 자체를 바로 리턴합니다.
        return returnData; 
    }
}