import { createPortal } from 'react-dom';
import '../../assets/css/loading.css';

const Loading = () => {
    // React Portal을 사용하여 document.body에 직접 렌더링
    // (부모 컴포넌트의 스타일 간섭 회피 및 전체 화면 덮기 용이)
    return createPortal(
        <div className="loading-overlay">
            <div className="loading-spinner"></div>
        </div>,
        document.body
    );
};

export default Loading;