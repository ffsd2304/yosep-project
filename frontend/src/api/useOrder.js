import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

export const useOrder = () => {
    const navigate = useNavigate();
    const { openModal } = useModal();

    /**
     * 상품 구매 프로세스 진행
     * 상세페이지(단일)와 장바구니(다중) 모두 배열 형태로 데이터를 전달받아 처리합니다.
     * @param {Array} items - 구매할 상품 목록 배열 [{ prodId, quantity, prodPrice, ... }]
     */
    const orderItems = async (items) => {
        if (!items || items.length === 0) {
            openModal("알림", "구매할 상품 정보가 없습니다.");
            return;
        }

        try {
            // 1. 재고 확인을 위한 데이터 가공 (prodId, quantity만 추출)
            const checkList = items.map(item => ({
                prodId: item.prodId,
                quantity: item.quantity || 1 // 수량 정보가 없으면 1개로 간주
            }));

            // state에 구매할 상품 정보를 담아서 보냅니다.
            navigate('/store/purchase', { state: { orderItems: items } });

        } catch (error) {
            // 4. 재고 부족 등의 에러 처리
            const msg = error.response?.data?.message || "구매 진행 중 오류가 발생했습니다.";
            openModal("구매 불가", msg);
        }
    };

    return { orderItems };
};
