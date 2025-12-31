package com.yosep.myweb.main.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yosep.myweb.banner.service.BannerDTO;
import com.yosep.myweb.banner.service.BannerMapper;
import com.yosep.myweb.code.service.CommonCodeDTO;
import com.yosep.myweb.code.service.CommonCodeMapper;
import com.yosep.myweb.product.service.ProductMapper;

@Service
public class HomeService {

    @Autowired
    private BannerMapper bannerMapper; // 배너 매퍼

    @Autowired
    private ProductMapper productMapper; // 상품 매퍼

    @Autowired
    private CommonCodeMapper commonCodeMapper; // 상품 매퍼

    public HashMap<Object,Object> getMainData(){
        HashMap<Object,Object> resultData = new HashMap<Object,Object>();

        List<BannerDTO> bannerList = bannerMapper.getBannerList();
        List<CommonCodeDTO> categoryList = commonCodeMapper.getCodeDetailList("PROD_CATEGORY");
        resultData.put("bannerList", bannerList);
        resultData.put("categoryList", categoryList);
        return resultData;
    }

}
