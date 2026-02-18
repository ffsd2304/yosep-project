import { createContext, useContext, useState } from 'react';
import Loading from '../components/common/Loading';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
            {children}
            {/* isLoading이 true일 때만 전역에서 로딩 화면을 띄웁니다 */}
            {isLoading && <Loading />}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);