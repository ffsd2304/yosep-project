<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
    <title>jQuery AJAX 테스트</title>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<script>
    $(document).ready(function() {
        // 버튼 클릭 이벤트
        $("#btnLoad").click(function() {
            loadMembers();
        });
        $("#btnSave").click(function() {
            createMembers();
        });
    });

    function loadMembers() {
        $.ajax({
            url: '/api/members', // 서버의 데이터 API 주소
            type: 'GET',         // 방식
            dataType: 'json',    // 받을 데이터 타입
            success: function(data) {
                var tbody = $("#memberTableBody");
                tbody.empty(); // 기존 내용 지우기

                // jQuery의 $.each 반복문 사용
                $.each(data, function(index, member) {
                    var row = "<tr>" +
                        "<td>" + member.userId + "</td>" +
                        "<td>" + member.userName + "</td>" +
                        "<td>" + member.userEmail + "</td>" +
                    "</tr>";
                    tbody.append(row); // 테이블에 추가
                });
            },
            error: function(xhr, status, error) {
                console.error("에러 발생: " + error);
                alert("데이터를 가져오는 데 실패했습니다.");
            }
        });
    }

    function createMembers(){
        // 1. 보낼 데이터 준비
        var memberData = {
            userId: $("#newId").val(),
            userName: $("#newName").val(),
            userEmail: $("#newEmail").val()
        };

        // 2. POST 방식으로 AJAX 호출
        $.ajax({
            url: '/api/members',
            type: 'POST',
            contentType: 'application/json', // 보낼 데이터가 JSON임을 명시
            data: JSON.stringify(memberData), // 객체를 문자열로 변환
            success: function(response) {
                alert("저장 성공!");
                loadMembers(); // 저장 후 목록 새로고침!
                // 입력창 비우기
                $("#newId").val('');
                $("#newName").val('');
                $("#newEmail").val('');
            },
            error: function() {
                alert("저장 실패!");
            }
        });
    }

</script>
<body>
    <h1>회원 목록 (jQuery AJAX 방식)</h1>
    <button id="btnLoad">데이터 불러오기</button>
    
    <table border="1">
        <thead>
            <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>이메일</th>
            </tr>
        </thead>
        <tbody id="memberTableBody">
        </tbody>
    </table>
    <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc;">
        <h3>회원 등록 (POST 방식)</h3>
        아이디: <input type="text" id="newId"> <br>
        이름: <input type="text" id="newName"> <br>
        이메일: <input type="text" id="newEmail"> <br>
        <button id="btnSave">저장하기</button>
    </div>

    
</body>
</html>