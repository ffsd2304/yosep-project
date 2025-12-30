/* 요셉 서비스 공통 자바스크립트 */

// 확인 버튼 클릭 시 실행될 함수를 저장할 변수
let modalCallback = null;

/**
 * @param title   : 팝업 제목
 * @param content : 팝업 내용
 * @param callback: [선택] 확인 버튼 클릭 시 실행할 함수
 */
function openModal(title, content, callback) {
    $("#modalTitle").text(title);
    $("#modalBody").html(content);
    $("#commonModal").css("display", "flex");

    // 전달받은 콜백 함수가 있으면 저장, 없으면 초기화
    modalCallback = (typeof callback === 'function') ? callback : null;
}

function closeModal() {
    $("#commonModal").hide();
    modalCallback = null; // 닫을 때 콜백 초기화
}

$(document).ready(function() {
    // 기존의 단순 closeModal 이벤트 수정
    $("#btnModalConfirm").click(function() {
        if (modalCallback) {
            modalCallback(); // 설정된 이벤트가 있다면 실행
        }
        closeModal(); // 실행 후 팝업 닫기
    });

    $("#btnModalX").click(function() {
        closeModal();
    });

    $(window).click(function(e) {
        if ($(e.target).is("#commonModal")) {
            closeModal();
        }
    });
});