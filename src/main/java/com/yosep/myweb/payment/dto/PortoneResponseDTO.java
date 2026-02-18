package com.yosep.myweb.payment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class PortoneResponseDTO {
    private boolean success;
    @JsonProperty("imp_uid")
    private String impUid;
    @JsonProperty("merchant_uid")
    private String merchantUid;
    @JsonProperty("pay_method")
    private String payMethod;
    @JsonProperty("paid_amount")
    private long paidAmount;
    private String status;
    @JsonProperty("pg_provider")
    private String pgProvider;
    @JsonProperty("paid_at")
    private long paidAt;
    @JsonProperty("receipt_url")
    private String receiptUrl;
    @JsonProperty("error_msg")
    private String errorMsg;
}