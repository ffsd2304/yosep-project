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
            <input type="text" id="userId" class="input-field" placeholder="아이디를 입력해 주세요" maxlength="20"> 
            <input type="password" id="userPw" class="input-field" placeholder="비밀번호" maxlength="20">
        </div>

        <div class="link-group">
            <div class="checkbox-group">
                <label>
                    <input type="checkbox" id="checkPrivacy">
                    <span class="custom-check"></span>
                </label>
                <a href="#" id="linkPrivacy" class="text-link">개인정보 수집이용 동의</a>
            </div>
            <a href="#" id="linkJoin" class="text-link">회원가입</a>
        </div>

        <button class="btn-primary" id="btnLogin" disabled>로그인</button>
    </div>

    
    <script>
        $(document).ready(function() {
            // 1. 개인정보 동의 팝업 열기 (common.js의 함수 사용)
            $("#linkPrivacy").click(function(e) {
                e.preventDefault();
                const termCode = "${privacyTermCode}";
                $.ajax({
                    url: '/api/terms',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ termCatSeq: termCode }),
                    success: function(data) {
                        if(data) {
                            // 3번째 인자로 '확인 버튼 클릭 시 실행할 함수'를 전달합니다.
                            openModal(data.termTitle, data.termContent, function() {
                                // 확인 버튼을 누르면 체크박스를 체크 상태로 만듭니다.
                                $("#checkPrivacy").prop("checked", true).change(); 
                                console.log("약관 동의가 완료되어 체크박스가 활성화되었습니다.");
                            });
                        }
                    }
                });
            });

            // 로그인 버튼 클릭 이벤트
            $("#btnLogin").click(function() {
                const userId = $("#userId").val();
                const userPw = $("#userPw").val();

                $.ajax({
                    url: '/api/login',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        userId: userId,
                        userPw: userPw
                    }),
                    success: function(data) {
                        if (data.status === "SUCCESS") {
                            // 성공 시 메인 페이지로 이동!
                            location.href = "/main"; 
                        } else {
                            // 실패 시 공통 모달로 알림
                            openModal("로그인 실패", data.message);
                        }
                    },
                    error: function() {
                        openModal("에러", "서버 통신 중 오류가 발생했습니다.");
                    }
                });
            });
            // [추가] 버튼 활성화 상태를 체크하는 함수
            function checkLoginStatus() {
                const userId = $("#userId").val().trim();
                const userPw = $("#userPw").val().trim();
                const isAgreed = $("#checkPrivacy").is(":checked");

                if (userId !== "" && userPw !== "" && isAgreed) {
                    // 모든 조건 만족 시: 버튼 활성화 + 노란색 클래스 추가
                    $("#btnLogin").prop("disabled", false).addClass("active");
                } else {
                    // 하나라도 부족 시: 버튼 비활성화 + 노란색 클래스 제거
                    $("#btnLogin").prop("disabled", true).removeClass("active");
                }
            }

            // 아이디, 비밀번호 입력할 때마다 체크
            $("#userId, #userPw").on("input", function() {
                checkLoginStatus();
            });

            // 체크박스 클릭할 때마다 체크
            $("#checkPrivacy").on("change", function() {
                checkLoginStatus();
            });
        });
    </script>
</body>
</html>