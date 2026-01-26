package com.yosep.myweb.main.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yosep.myweb.banner.service.BannerDTO;
import com.yosep.myweb.banner.service.BannerMapper;
import com.yosep.myweb.code.service.CodeCacheService;
import com.yosep.myweb.code.service.CommonCodeDTO;

@Service
public class HomeService {

    @Autowired
    private BannerMapper bannerMapper; // 배너 매퍼

    @Autowired
    private CodeCacheService codeCacheService; // 코드 캐시 서비스

    public HashMap<Object,Object> getMainData(){
        HashMap<Object,Object> resultData = new HashMap<Object,Object>();

        List<BannerDTO> bannerList = bannerMapper.getBannerList();
        List<CommonCodeDTO> categoryList = codeCacheService.getCodeList("PROD_CATEGORY");
        resultData.put("bannerList", bannerList);
        resultData.put("categoryList", categoryList);
        return resultData;
    }

}
