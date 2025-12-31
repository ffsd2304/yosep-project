package com.yosep.myweb.banner.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

/**
 * 메인 배너 데이터 처리를 위한 매퍼 인터페이스
 */
@Mapper
public interface BannerMapper {

    /**
     * 사용 가능한 배너 목록을 노출 순서대로 조회합니다.
     * (BannerMapper.xml의 id="getBannerList" 쿼리와 매칭됨)
     * * @return 활성화된 배너 정보 리스트 (BannerDTO)
     */
    List<BannerDTO> getBannerList(); 
}