package com.yosep.myweb.payment.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.yosep.myweb.payment.dto.OrderItemDTO;
import com.yosep.myweb.payment.dto.OrderListDTO;
import com.yosep.myweb.payment.dto.PaymentDetailDTO;

@Mapper
public interface PaymentMapper {
    void insertOrderList(OrderListDTO orderList);
    void insertOrderItem(OrderItemDTO orderItem);
    void insertPaymentDetail(PaymentDetailDTO paymentDetail);
    void updateOrderStatus(@Param("orderId") String orderId, @Param("status") String status);
    List<Map<String, Object>> selectOrderList(@Param("userId") String userId, @Param("period") int period);
}