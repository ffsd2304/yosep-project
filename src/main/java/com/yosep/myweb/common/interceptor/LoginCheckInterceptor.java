package com.yosep.myweb.common.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class LoginCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        
        // 1. 세션이 있는지 확인
        HttpSession session = request.getSession(false); // false: 세션이 없으면 새로 만들지 않음

        // 2. 세션에 로그인 정보가 있는지 확인
        // (주의: 로그인할 때 session.setAttribute("loginUser", dto) 라고 저장했다고 가정)
        if (session == null || session.getAttribute("loginUser") == null) {
            
            // 3. 로그인 안 했으면 로그인 페이지로 튕겨내기
            System.out.println("[미인증 사용자 요청] 로그인 페이지로 리다이렉트");
            response.sendRedirect("/login?redirectURL=" + request.getRequestURI());
            return false; // 컨트롤러로 보내지 않고 여기서 끝냄
        }

        // 4. 통과! (Controller 실행)
        return true; 
    }
}
