import { createContext, useCallback, useContext, useState } from 'react';

// 1. 방송국 채널 개설
const HeaderContext = createContext();

// 2. 방송국 건물 (Provider)
export const HeaderProvider = ({ children }) => {
    // 헤더 상태 관리 (초기값: 제목 없음, 뒤로가기 true)
    const [headerConfig, setHeaderConfig] = useState({
        title: '',
        showBack: true
    });

    // 헤더 정보를 바꾸는 함수 (편리하게 쓰기 위해 함수 하나로 묶음)
    const setHeader = useCallback((title, showBack = true) => {
        setHeaderConfig({ title, showBack });
    }, []);

    return (
        <HeaderContext.Provider value={{ headerConfig, setHeader }}>
            {children}
        </HeaderContext.Provider>
    );
};

// 3. 리모컨 (Custom Hook) - 다른 파일에서 이거 한 줄이면 불러올 수 있음!
export const useHeader = () => useContext(HeaderContext);