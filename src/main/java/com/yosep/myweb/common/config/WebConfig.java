package com.yosep.myweb.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry; // [필수] import 추가
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // [기존] 인터셉터 설정 (로그인 체크 등)
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // registry.addInterceptor(new LoginCheckInterceptor())
        //         .order(1)
        //         .addPathPatterns("/**")
        //         .excludePathPatterns(
        //                 "/", "/login", "/join", "/api/login", // api/login 꼭 제외!
        //                 "/product/**", "/api/product/**",     // 상품 관련 API도 열어두기
        //                 "/css/**", "/js/**", "/images/**", "/favicon.ico", "/error"
        //         );
    }

    // ▼▼▼ [추가] CORS 설정 (리액트 접속 허용) ▼▼▼
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")               // 모든 주소에 대해
                .allowedOrigins("http://localhost:5173") // 리액트 서버 주소(포트) 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 동작
                .allowCredentials(true); // 쿠키/세션 정보 허용
    }
}