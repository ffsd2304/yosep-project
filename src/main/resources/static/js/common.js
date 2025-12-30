/* 요셉 서비스 공통 자바스크립트 */

// 팝업 열기 함수 (제목, 내용 전달)
function openModal(title, content) {
    $("#modalTitle").text(title);
    $("#modalBody").html(content); // HTML 태그도 넣을 수 있게 html() 사용
    $("#commonModal").css("display", "flex");
}

// 팝업 닫기 함수
function closeModal() {
    $("#commonModal").hide();
}

$(document).ready(function() {
    // 공통 닫기 이벤트 바인딩
    $("#btnModalX, #btnModalConfirm").click(function() {
        closeModal();
    });

    // 배경 클릭 시 닫기
    $(window).click(function(e) {
        if ($(e.target).is("#commonModal")) {
            closeModal();
        }
    });
});