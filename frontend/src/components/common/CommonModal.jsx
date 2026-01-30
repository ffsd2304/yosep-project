// src/components/common/CommonModal.jsx
import '../../assets/css/style.css';

const CommonModal = ({ isOpen, onClose, title, children, onConfirm, type = 'alert' }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">{title}</div>
                    <button className="btn-close" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    {/* ▼▼▼ 여기가 핵심! 문자열이면 HTML로, 아니면 그냥 렌더링 ▼▼▼ */}
                    {typeof children === 'string' ? (
                        <div dangerouslySetInnerHTML={{ __html: children }} />
                    ) : (
                        children
                    )}
                </div>

                <div className="modal-footer">
                    {type === 'confirm' && (
                        <button className="btn-modal-cancel" onClick={onClose}>
                            취소
                        </button>
                    )}
                    <button className="btn-modal-close" onClick={handleConfirm}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommonModal;