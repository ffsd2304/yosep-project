import '../../assets/css/style.css'; // 스타일 파일 경로 확인!

const CommonModal = ({ isOpen, onClose, title, children, onConfirm }) => {
    // 1. isOpen이 false면 아예 화면에 그리지 않습니다. (JSP의 display:none 역할)
    if (!isOpen) return null;

    // 2. 확인 버튼 클릭 시 동작
    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(); // 추가 동작이 있다면 실행 (예: 약관 동의 체크)
        }
        onClose(); // 모달 닫기
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* 헤더 */}
                <div className="modal-header">
                    <div className="modal-title">{title}</div>
                    <button className="btn-close" onClick={onClose}>✕</button>
                </div>

                {/* 본문 (children 자리에 내용이 쏙 들어갑니다) */}
                <div className="modal-body">
                    {children}
                </div>

                {/* 푸터 */}
                <div className="modal-footer">
                    <button className="btn-modal-close" onClick={handleConfirm}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommonModal;