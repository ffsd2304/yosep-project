package com.yosep.myweb.banner.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BannerService {
    @Autowired
    private BannerMapper bannerMapper;

    public List<BannerDTO> getBannerList() {
        return bannerMapper.getBannerList(); // 나중에 여기서 로직을 추가할 수 있습니다
    }
}
