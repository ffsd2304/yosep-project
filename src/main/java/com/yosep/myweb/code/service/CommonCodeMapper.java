package com.yosep.myweb.code.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommonCodeMapper {
    /**
     * 특정 마스터 코드에 속한 상세 코드 리스트를 가져옵니다.
     * @param masterCode 그룹 코드 (예: 'PROD_CATEGORY')
     */
    List<CommonCodeDTO> getCodeDetailList(String masterCode);

    /**
     * 모든 사용 가능한 상세 코드 리스트를 가져옵니다.
     */
    List<CommonCodeDTO> getAllCodeList();
}