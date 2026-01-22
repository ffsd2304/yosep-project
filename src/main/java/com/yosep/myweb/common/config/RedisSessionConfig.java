package com.yosep.myweb.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@Configuration
@EnableRedisHttpSession  // 이 어노테이션이 핵심입니다!
public class RedisSessionConfig {
    // 특별한 커스터마이징이 없다면 빈 클래스로 두어도 작동합니다.
    // 세션 데이터를 JSON으로 직렬화하는 설정
    @Bean
    public RedisSerializer<Object> springSessionDefaultRedisSerializer() {
        return new GenericJackson2JsonRedisSerializer();
    }
}