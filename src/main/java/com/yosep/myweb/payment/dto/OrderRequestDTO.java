package com.yosep.myweb.payment.dto;

import java.util.List;

import lombok.Data;

@Data
public class OrderRequestDTO {
    private String userId;
    private String receiverName;
    private String receiverAddr;
    private String receiverTel;
    private long shippingFee; // 프론트에서 전달받을 배송비
    private List<OrderItemDTO> orderItems;
    private PortoneResponseDTO portoneResponse;
}