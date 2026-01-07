package com.yosep.myweb.common.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class LoginCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // 1. [추가] CORS Preflight 요청(OPTIONS)은 그냥 통과시킨다.
        if (request.getMethod().equals("OPTIONS")) {
            return true; 
        }

        // 2. 기존 로그인 검사 로직
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("loginUser") == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"status\":\"FAIL\", \"message\":\"LOGIN_REQUIRED\"}");
            return false; 
        }
        return true; 
    }
}
