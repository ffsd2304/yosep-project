package com.yosep.myweb.payment.dto;

import java.util.List;

import lombok.Data;

@Data
public class OrderListDTO {
    private String orderId;
    private String userId;
    private long totalProdPrice; // 상품 총액
    private long shippingFee;    // 배송비
    private long finalPrice;     // 최종 결제 금액
    private String orderStatus;
    private String receiverName;
    private String receiverAddr;
    private String receiverTel;
    private List<OrderItemDTO> orderItems;
}