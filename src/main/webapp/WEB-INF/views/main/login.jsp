<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Yosep Service Login</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <jsp:include page="../common/modal.jsp" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="/js/common.js"></script>

    <div class="login-container">
        <div class="login-header">
            <div class="brand-logo">Yosep Service</div> <button class="btn-close">✕</button>
        </div>

        <div class="login-form">
            <input type="text" id="userId" class="input-field" placeholder="아이디를 입력해 주세요"> 
            <input type="password" id="userPw" class="input-field" placeholder="비밀번호">
        </div>

        <div class="link-group">
            <a href="#" id="linkPrivacy" class="text-link">개인정보 수집이용 동의</a>
            <a href="#" id="linkJoin" class="text-link">회원가입</a>
        </div>

        <button class="btn-primary" id="btnLogin">로그인</button>
    </div>

    
    <script>
        $(document).ready(function() {
            // 1. 개인정보 동의 팝업 열기 (common.js의 함수 사용)
            $("#linkPrivacy").click(function(e) {
                e.preventDefault();
                const title = "개인정보 수집 및 이용 동의";
                const content = "1. 수집항목: 아이디, 이름, 연락처<br>2. 이용목적: 회원 식별<br>3. 보유기간: 탈퇴 시까지";
                openModal(title, content); // common.js에 정의된 함수
            });

            // 2. 로그인 버튼 이벤트
            $("#btnLogin").click(function() {
                const userId = $("#userId").val();
                const userPw = $("#userPw").val();

                if(!userId || !userPw) {
                    openModal("알림", "아이디와 비밀번호를 모두 입력해주세요.");
                    return;
                }

                // 서버 통신 로직 (AJAX)이 여기에 들어갑니다
                console.log("로그인 시도 ID:", userId);
            });

            // 3. 버튼 호버 효과 (표준 디자인 유지)
            $("#btnLogin").hover(
                function() { $(this).addClass("active"); },
                function() { $(this).removeClass("active"); }
            );
        });
    </script>
</body>
</html>