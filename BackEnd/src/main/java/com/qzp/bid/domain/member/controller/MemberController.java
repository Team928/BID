package com.qzp.bid.domain.member.controller;

import static com.qzp.bid.global.result.ResultCode.GET_HAUCTION_SUCCESS;
import static com.qzp.bid.global.result.ResultCode.GET_MYPAGE_SUCCESS;
import static com.qzp.bid.global.result.ResultCode.GET_MYWISH_SUCCESS;
import static com.qzp.bid.global.result.ResultCode.NICKNAME_DO_EXIST;
import static com.qzp.bid.global.result.ResultCode.NICKNAME_DO_NOT_EXIST;
import static com.qzp.bid.global.result.ResultCode.REGISTER_SUCCESS;

import com.qzp.bid.domain.deal.purchase.dto.PurchaseListPage;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import com.qzp.bid.domain.member.dto.LookupParam;
import com.qzp.bid.domain.member.dto.MemberJoinReq;
import com.qzp.bid.domain.member.dto.MemberProfileRes;
import com.qzp.bid.domain.member.service.MemberService;
import com.qzp.bid.global.result.ResultResponse;
import com.qzp.bid.global.result.error.ErrorCode;
import com.qzp.bid.global.result.error.exception.BusinessException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Tag(name = "MemberController", description = "멤버관련 api")
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "닉네임 중복 확인")
    @GetMapping("/{nickname}")
    public ResponseEntity<ResultResponse> checkNickname(@PathVariable("nickname") String nickname) {
        try {
            boolean check = memberService.checkNickname(nickname);

            if (check == true) { //중복된 닉네임이 존재하는 경우
                return ResponseEntity.ok(ResultResponse.of(NICKNAME_DO_EXIST, false));
            }
            return ResponseEntity.ok(ResultResponse.of(NICKNAME_DO_NOT_EXIST, true));

        } catch (Exception e) {
            log.debug("닉네임 중복체크 에러 발생: {}", e);
            throw new RuntimeException(e);
        }
    }

    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<ResultResponse> register(@RequestBody MemberJoinReq memberJoinReq) {
        try {
            memberService.register(memberJoinReq);
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.REGISTER_FAIL);
        }
        return ResponseEntity.ok(ResultResponse.of(REGISTER_SUCCESS));
    }

    @Operation(summary = "프로필 조회")
    @GetMapping("/profile/{nickname}")
    public ResponseEntity<ResultResponse> getProfile(@PathVariable("nickname") String nickname) {
        MemberProfileRes memberProfileRes = memberService.getProfile(nickname);
        return ResponseEntity.ok(ResultResponse.of(GET_MYPAGE_SUCCESS, memberProfileRes));
    }

    @Operation(summary = "내 경매 내역 - 내가 주최한 경매")
    @GetMapping("/profile/{nickname}/hauction")
    public ResponseEntity<ResultResponse> getHauction(@PathVariable("nickname") String nickname,
        Pageable pageable) {
        SaleListPage saleListPage = memberService.getHauction(nickname, pageable);
        return ResponseEntity.ok(ResultResponse.of(GET_HAUCTION_SUCCESS, saleListPage));
    }

    @Operation(summary = "나의 찜 목록 조회")
    @GetMapping("/profile/{nickname}/wish")
    public ResponseEntity<ResultResponse> getWish(@PathVariable("nickname") String nickname,
        LookupParam lookupParam) {
        if (lookupParam.getType().equals("sale")) {
            SaleListPage saleListPage = memberService.getSaleWish(nickname, lookupParam);
            return ResponseEntity.ok(ResultResponse.of(GET_MYWISH_SUCCESS, saleListPage));
        } else if (lookupParam.getType().equals("purchase")) {
            PurchaseListPage purchaseListPage = memberService.getPurchaseWish(nickname,
                lookupParam);
            return ResponseEntity.ok(ResultResponse.of(GET_MYWISH_SUCCESS, purchaseListPage));
        }
        return ResponseEntity.ok(ResultResponse.of(GET_MYWISH_SUCCESS));
    }

}
