// src/context/ModalContext.jsx
import { createContext, useContext, useState } from 'react';
import CommonModal from '../components/common/CommonModal';

// 1. 방송국 채널 개설
const ModalContext = createContext();

// 2. 모달 기능을 쉽게 쓰기 위한 커스텀 훅 (다른 파일에서 이것만 부르면 됨)
export const useModal = () => useContext(ModalContext);

// 3. 방송국 본체 (Provider)
export const ModalProvider = ({ children }) => {
    const [modalInfo, setModalInfo] = useState({
        isOpen: false,
        title: '',
        content: null, // 컴포넌트도 넣을 수 있게 null로 초기화
        callback: null
    });

    // 열기 기능
    const openModal = (title, content, callback = null) => {
        setModalInfo({
            isOpen: true,
            title,
            content,
            callback
        });
    };

    // 닫기 기능
    const closeModal = () => {
        setModalInfo((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {/* 앱의 나머지 화면들을 보여줌 */}
            {children}
            
            {/* ▼▼▼ 전역 모달이 여기에 딱 1개만 존재합니다 ▼▼▼ */}
            <CommonModal 
                isOpen={modalInfo.isOpen}
                onClose={closeModal}
                title={modalInfo.title}
                onConfirm={modalInfo.callback}
            >
                {modalInfo.content}
            </CommonModal>
        </ModalContext.Provider>
    );
};