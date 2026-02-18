package com.yosep.myweb.payment.dto;

import lombok.Data;

@Data
public class OrderItemDTO {
    private long itemId;      // ITEM_ID (DB에서 시퀀스로 생성)
    private String orderId;   // ORDER_ID
    private String prodId;    // PROD_ID
    private int quantity;     // QUANTITY
    private long price;       // PRICE
}