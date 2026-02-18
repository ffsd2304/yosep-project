package com.yosep.myweb.payment.web;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yosep.myweb.member.dto.MemberDTO;
import com.yosep.myweb.payment.dto.OrderListDTO;
import com.yosep.myweb.payment.dto.OrderRequestDTO;
import com.yosep.myweb.payment.dto.PaymentDetailDTO;
import com.yosep.myweb.payment.dto.PortoneResponseDTO;
import com.yosep.myweb.payment.service.PaymentService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/payment")
public class PaymentRestController {

    @Autowired
    private PaymentService paymentService;

    // 1. [추가] 결제 전 PENDING 데이터 생성 API
    @PostMapping("/pending")
    public ResponseEntity<String> createPendingOrder(@RequestBody OrderRequestDTO request) {
        try {
            // OrderListDTO 생성
            // 1. 상품 총액 계산
            long totalProdPrice = request.getOrderItems().stream()
                                .mapToLong(item -> item.getPrice() * item.getQuantity())
                                .sum();
            // 2. 배송비 (프론트에서 전달받음)
            long shippingFee = request.getShippingFee();

            OrderListDTO orderList = new OrderListDTO();
            orderList.setOrderId(request.getPortoneResponse().getMerchantUid());
            orderList.setUserId(request.getUserId());
            
            orderList.setTotalProdPrice(totalProdPrice);
            orderList.setShippingFee(shippingFee);
            orderList.setFinalPrice(totalProdPrice + shippingFee); // 최종 금액
            
            orderList.setReceiverName(request.getReceiverName());
            orderList.setReceiverAddr(request.getReceiverAddr());
            orderList.setReceiverTel(request.getReceiverTel());
            orderList.setOrderItems(request.getOrderItems());

            paymentService.createPendingOrder(orderList);

            return new ResponseEntity<>("Pending order created.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error creating pending order: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/complete")
    public ResponseEntity<String> completePayment(@RequestBody OrderRequestDTO request) {
        try {
            PortoneResponseDTO pres = request.getPortoneResponse();

            // 1. PaymentDetailDTO 생성
            PaymentDetailDTO paymentDetail = new PaymentDetailDTO();
            paymentDetail.setImpUid(pres.getImpUid());
            paymentDetail.setOrderId(pres.getMerchantUid());
            paymentDetail.setPayMethod(pres.getPayMethod());
            paymentDetail.setPaidAmount(pres.getPaidAmount());
            paymentDetail.setPgProvider(pres.getPgProvider());
            paymentDetail.setPaidAt(new Date(pres.getPaidAt() * 1000L)); // Unix Timestamp(초) -> Date 변환
            paymentDetail.setReceiptUrl(pres.getReceiptUrl());

            // 2. [변경] 이미 PENDING으로 저장된 주문을 PAID로 업데이트하고 결제정보 저장
            if (pres.isSuccess()) {
                paymentService.completePayment(pres.getMerchantUid(), paymentDetail);
            } else {
                // 결제 실패 시 FAILED로 상태 업데이트
                paymentService.failPayment(pres.getMerchantUid());
            }

            return new ResponseEntity<>("Order data saved successfully.", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error processing payment: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 3. [추가] 주문 내역 조회 API
    @PostMapping("/orderList")
    public ResponseEntity<List<Map<String, Object>>> getOrderList(@RequestBody Map<String, Object> params, HttpSession session) {
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");
        if (loginUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // 기간 파라미터 처리 (기본값 6개월)
        int period = 6;
        if (params != null && params.containsKey("period")) {
            try {
                period = Integer.parseInt(String.valueOf(params.get("period")));
            } catch (NumberFormatException e) {
                period = 6;
            }
        }

        List<Map<String, Object>> list = paymentService.getOrderList(loginUser.getUserId(), period);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}