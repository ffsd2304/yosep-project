package com.yosep.myweb.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry; // [필수] import 추가
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.yosep.myweb.common.interceptor.LoginCheckInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // [기존] 인터셉터 설정 (로그인 체크 등)
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginCheckInterceptor())
                .order(1)
                .addPathPatterns("/api/**") // 모든 API 요청을 감시하되
                .excludePathPatterns(
                    "/api/member/login",   // 로그인
                    "/api/terms/terms"                 // 약관조회
                );
    }

        // ▼▼▼ [추가] CORS 설정 (리액트 접속 허용) ▼▼▼
    @Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            // allowedOrigins 대신 allowedOriginPatterns를 사용하면 
            // 와일드카드(*)를 조합해서 더 유연하게 등록할 수 있습니다.
            .allowedOriginPatterns(
                "http://localhost:5173",
                "http://10.0.2.2:5173",
                "http://10.101.66.154:5173",
                "http://10.101.66.120:*", // 포트 번호가 바뀌어도 허용되도록 수정
                "http://136.118.142.58:*"  // [추가] 구글 인스턴스 IP 허용
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*") // 모든 헤더 허용 추가 (안전장치)
            .allowCredentials(true);
}
}