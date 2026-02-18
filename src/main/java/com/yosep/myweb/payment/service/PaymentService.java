package com.yosep.myweb.payment.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yosep.myweb.payment.dto.OrderItemDTO;
import com.yosep.myweb.payment.dto.OrderListDTO;
import com.yosep.myweb.payment.dto.PaymentDetailDTO;

@Service
public class PaymentService  {

    @Autowired
    private PaymentMapper paymentMapper;

    // 1. [변경] 결제 전 주문 생성 (PENDING 상태)
    @Transactional // 여러 DB 작업을 하나의 트랜잭션으로 묶어 원자성을 보장합니다.
    public void createPendingOrder(OrderListDTO orderList) {
        // 1. 주문 정보 저장 (ORDER_LIST)
        orderList.setOrderStatus("PENDING"); // 강제로 PENDING 설정
        paymentMapper.insertOrderList(orderList);

        // 2. 주문 상품 정보 저장 (ORDER_ITEM) - List 반복 처리
        if (orderList.getOrderItems() != null && !orderList.getOrderItems().isEmpty()) {
            for (OrderItemDTO item : orderList.getOrderItems()) {
                item.setOrderId(orderList.getOrderId()); // 각 상품에 주문번호 설정
                paymentMapper.insertOrderItem(item);
            }
        }
    }

    // 2. [추가] 결제 완료 처리 (PAID 상태 업데이트 + 결제 상세 저장)
    @Transactional
    public void completePayment(String orderId, PaymentDetailDTO paymentDetail) {
        paymentMapper.updateOrderStatus(orderId, "PAID");
        paymentMapper.insertPaymentDetail(paymentDetail);
    }

    // 3. [추가] 결제 실패 처리 (FAILED 상태 업데이트)
    public void failPayment(String orderId) {
        paymentMapper.updateOrderStatus(orderId, "FAILED");
    }

    // 4. [추가] 주문 내역 조회
    public List<Map<String, Object>> getOrderList(String userId, int period) {
        return paymentMapper.selectOrderList(userId, period);
    }
}