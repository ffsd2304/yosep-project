package com.yosep.myweb.payment.dto;

import java.util.Date;

import lombok.Data;

@Data
public class PaymentDetailDTO {
    private String impUid;        // IMP_UID
    private String orderId;       // ORDER_ID
    private String payMethod;     // PAY_METHOD
    private long paidAmount;      // PAID_AMOUNT
    private String pgProvider;    // PG_PROVIDER
    private Date paidAt;          // PAID_AT (Unix Timestamp -> Date)
    private String receiptUrl;    // RECEIPT_URL
}