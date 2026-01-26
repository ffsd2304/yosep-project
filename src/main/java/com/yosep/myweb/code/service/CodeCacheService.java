package com.yosep.myweb.code.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CodeCacheService {

    private final CommonCodeMapper commonCodeMapper;
    
    // 메모리에 코드를 저장할 맵 (Key: masterCode, Value: 상세 코드 리스트)
    private final Map<String, List<CommonCodeDTO>> codeMap = new ConcurrentHashMap<>();

    /**
     * 서버 시작 시 실행되어 모든 코드를 메모리에 로드합니다.
     */
    @PostConstruct
    public void init() {
        reloadCache();
    }

    /**
     * DB에서 코드를 다시 읽어와 캐시를 갱신합니다. (관리자 화면 등에서 코드 변경 시 호출 가능)
     */
    public void reloadCache() {
        log.info("공통 코드 캐시 로딩 시작...");
        List<CommonCodeDTO> allCodes = commonCodeMapper.getAllCodeList();
        
        // masterCode별로 그룹화하여 맵에 저장
        Map<String, List<CommonCodeDTO>> grouped = allCodes.stream()
                .collect(Collectors.groupingBy(CommonCodeDTO::getMasterCode));
        
        codeMap.clear();
        codeMap.putAll(grouped);
        log.info("공통 코드 캐시 로딩 완료. (그룹 수: {})", codeMap.size());
    }

    /**
     * 특정 마스터 코드에 해당하는 상세 코드 리스트를 캐시에서 반환합니다.
     */
    public List<CommonCodeDTO> getCodeList(String masterCode) {
        return codeMap.getOrDefault(masterCode, new ArrayList<>());
    }
}