package com.yosep.myweb.addr.web;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.yosep.myweb.member.service.MemberAddrDTO;
import com.yosep.myweb.member.service.MemberDTO;
import com.yosep.myweb.member.service.MemberService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController // 이 컨트롤러는 HTML이 아닌 데이터(JSON)만 보냅니다.
@RequestMapping("/api/addr")
@RequiredArgsConstructor
@Slf4j
public class AddrRestController {
    
    private final MemberService memberService;

    // 발급받은 승인키
    private final String API_KEY = "U01TX0FVVEgyMDI2MDEyOTA5MzMyNDExNzUxMTg="; 
    private final String API_URL = "https://business.juso.go.kr/addrlink/addrLinkApi.do";

    @PostMapping("/addresses")
    public Map<String, Object> getAddressList(@RequestBody(required = false) MemberAddrDTO memberAddrDTO, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        // 세션에서 로그인된 유저 정보 가져오기
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");

        // 파라미터가 넘어오지 않았을 경우 객체 초기화 (NullPointerException 방지)
        if (memberAddrDTO == null) {
            memberAddrDTO = new MemberAddrDTO();
        }

        if (loginUser != null) {
            // 세션의 userId를 사용하여 배송지 목록 조회
            memberAddrDTO.setUserId(loginUser.getUserId());
            List<MemberAddrDTO> addresses = memberService.getAddressList(memberAddrDTO);
            result.put("status", "SUCCESS");
            result.put("addresses", addresses);
        } else {
            result.put("status", "FAIL");
            result.put("message", "로그인이 필요한 서비스입니다.");
        }
        
        return result;
    }

    @PostMapping("/insert")
    public Map<String, Object> insertAddress(@RequestBody(required = false) MemberAddrDTO memberAddrDTO, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        // 세션에서 로그인된 유저 정보 가져오기
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");

        // 파라미터가 넘어오지 않았을 경우 객체 초기화 (NullPointerException 방지)
        if (memberAddrDTO == null) {
            memberAddrDTO = new MemberAddrDTO();
        }

        if (loginUser != null) {
            // 세션의 userId를 사용하여 배송지 목록 조회
            memberAddrDTO.setUserId(loginUser.getUserId());
            log.info(memberAddrDTO.toString());
            int insertCount = memberService.insertAddress(memberAddrDTO);
            if(insertCount > 0) {
                result.put("status", "SUCCESS");
            } else {
                result.put("status", "FAIL");
                result.put("message", "배송지 등록에 실패했습니다.");
            }
        } else {
            result.put("status", "FAIL");
            result.put("message", "로그인이 필요한 서비스입니다.");
        }
        
        return result;
    }

    @PostMapping("/delete")
    public Map<String, Object> deleteAddress(@RequestBody(required = false) MemberAddrDTO memberAddrDTO, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        // 세션에서 로그인된 유저 정보 가져오기
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");

        // 파라미터가 넘어오지 않았을 경우 객체 초기화
        if (memberAddrDTO == null) {
            memberAddrDTO = new MemberAddrDTO();
        }

        if (loginUser != null) {
            memberAddrDTO.setUserId(loginUser.getUserId());
            int deleteCount = memberService.deleteAddress(memberAddrDTO);
            if (deleteCount > 0) {
                result.put("status", "SUCCESS");
            } else {
                result.put("status", "FAIL");
                result.put("message", "배송지 삭제에 실패했습니다.");
            }
        } else {
            result.put("status", "FAIL");
            result.put("message", "로그인이 필요한 서비스입니다.");
        }
        
        return result;
    }

    @GetMapping("/juso")
    public String getJusoList(@RequestParam String keyword, @RequestParam(defaultValue = "1") int page) {

        RestTemplate restTemplate = new RestTemplate();

        // URI 생성 (한글 깨짐 방지를 위해 인코딩 주의)
        URI uri = UriComponentsBuilder.fromHttpUrl(API_URL)
                .queryParam("confmKey", API_KEY)
                .queryParam("currentPage", page)
                .queryParam("countPerPage", 10) // 10개씩 가져오기
                .queryParam("keyword", keyword)
                .queryParam("resultType", "json") // JSON 요청 필수!
                .build()
                .encode()
                .toUri();

        // 행정안전부 API 호출 후 결과(JSON String)를 그대로 React로 리턴
        return restTemplate.getForObject(uri, String.class);
    }
}