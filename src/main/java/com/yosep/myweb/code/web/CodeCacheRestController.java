package com.yosep.myweb.code.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yosep.myweb.code.service.CodeCacheService;
import com.yosep.myweb.code.service.CommonCodeDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/common/codes")
@RequiredArgsConstructor
public class CodeCacheRestController {

    private final CodeCacheService codeCacheService;

    /**
     * 특정 마스터 코드에 해당하는 상세 코드 리스트를 캐시에서 조회합니다.
     */
    @GetMapping("/{masterCode}")
    public Map<String, Object> getCodes(@PathVariable String masterCode) {
        Map<String, Object> response = new HashMap<>();
        List<CommonCodeDTO> codes = codeCacheService.getCodeList(masterCode);
        
        response.put("status", "SUCCESS");
        response.put("codes", codes);
        return response;
    }
}
