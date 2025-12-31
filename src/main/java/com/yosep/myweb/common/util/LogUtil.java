package com.yosep.myweb.common.util;

import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LogUtil {

    /**
     * HashMap 데이터를 리스트별로 예쁘게 출력합니다.
     * @param mapName 로그에 표시할 맵의 이름
     * @param dataMap 실제 로그를 찍을 데이터 맵
     */
    public static void printMapData(String mapName, Map<Object, Object> dataMap) {
        if (dataMap == null || dataMap.isEmpty()) {
            log.info("▶ [{}] : 데이터가 비어있습니다.", mapName);
            return;
        }

        log.info("==================== [ {} Start ] ====================", mapName);
        
        dataMap.forEach((key, value) -> {
            log.info("▶ Key: {}", key);
            
            if (value instanceof List<?>) {
                List<?> list = (List<?>) value;
                if (list.isEmpty()) {
                    log.info("   - (Empty List)");
                } else {
                    for (int i = 0; i < list.size(); i++) {
                        log.info("   [{}] - Item {}: {}", key, i + 1, list.get(i));
                    }
                }
            } else {
                log.info("   - Value: {}", value);
            }
        });

        log.info("==================== [ {} End ] ======================", mapName);
    }
}