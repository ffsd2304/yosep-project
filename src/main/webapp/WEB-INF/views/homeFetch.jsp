<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
    <title>API 호출 테스트</title>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>
    <h1>회원 목록 (API 비동기 호출 방식)</h1>
    <button onclick="loadMembers()">데이터 불러오기</button>
    
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

    <script>
        function loadMembers() {
            // 1. 서버 API 호출 (아까 확인한 그 주소!)
            fetch('/api/members')
                .then(response => response.json()) // 응답을 JSON으로 변환
                .then(data => {
                    const tbody = document.getElementById('memberTableBody');
                    tbody.innerHTML = ''; // 기존 내용 삭제

                    // 2. 받은 데이터를 반복문으로 돌리며 태그 생성
                    data.forEach(member => {
                        const row = `<tr>
                            <td>\${member.userId}</td>
                            <td>\${member.userName}</td>
                            <td>\${member.userEmail}</td>
                        </tr>`;
                        tbody.innerHTML += row; // 테이블에 추가
                    });
                })
                .catch(error => console.error('Error:', error));
        }

        // 페이지 로드 시 바로 실행하고 싶다면 주석 해제
        // window.onload = loadMembers;
    </script>
</body>
</html>