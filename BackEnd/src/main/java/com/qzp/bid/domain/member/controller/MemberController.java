package com.qzp.bid.domain.member.controller;

import static com.qzp.bid.global.result.ResultCode.GET_BIDHISTORY_SUCCESS;
import static com.qzp.bid.global.result.ResultCode.GET_MYPAGE_SUCCESS;
import static com.qzp.bid.global.result.ResultCode.GET_MYWISH_SUCCESS;
import static com.qzp.bid.global.result.ResultCode.GET_PARTICIPATEDSALE_SUCCESS;
import static com.qzp.bid.global.result.ResultCode.GET_PARTICIPATEPURCHASE_SUCCESS;
import static com.qzp.bid.global.result.ResultCode.GET_PURCHASEHOST_SUCCESS;
import static com.qzp.bid.global.result.ResultCode.GET_SALEHOST_SUCCESS;
import static com.qzp.bid.global.result.ResultCode.NICKNAME_DO_EXIST;
import static com.qzp.bid.global.result.ResultCode.NICKNAME_DO_NOT_EXIST;
import static com.qzp.bid.global.result.ResultCode.REGISTER_SUCCESS;
import static com.qzp.bid.global.result.ResultCode.UPDATE_PROFILE_SUCCESS;

import com.qzp.bid.domain.auth.dto.LoginTokenRes;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseListPage;
import com.qzp.bid.domain.deal.sale.dto.BidHistoryListPage;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import com.qzp.bid.domain.member.dto.LookupParam;
import com.qzp.bid.domain.member.dto.MemberJoinReq;
import com.qzp.bid.domain.member.dto.MemberProfileRes;
import com.qzp.bid.domain.member.dto.MemberReviewReq;
import com.qzp.bid.domain.member.dto.MemberUpdateProfileReq;
import com.qzp.bid.domain.member.dto.PointChargeReq;
import com.qzp.bid.domain.member.dto.ReviewListPage;
import com.qzp.bid.domain.member.service.MemberService;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
        LoginTokenRes loginTokenRes = memberService.register(memberJoinReq);
        return ResponseEntity.ok(ResultResponse.of(REGISTER_SUCCESS, loginTokenRes));
    }

    @Operation(summary = "프로필 조회")
    @GetMapping("/profiles/{nickname}")
    public ResponseEntity<ResultResponse> getProfile(@PathVariable("nickname") String nickname) {
        MemberProfileRes memberProfileRes = memberService.getProfile(nickname);
        return ResponseEntity.ok(ResultResponse.of(GET_MYPAGE_SUCCESS, memberProfileRes));
    }

    @Operation(summary = "프로필 수정")
    @PatchMapping(value = "/profiles", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResultResponse> updateProfile(
        @RequestPart(value = "memberUpdateProfileReq") MemberUpdateProfileReq memberUpdateProfileReq,
        @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {
        memberService.updateProfile(memberUpdateProfileReq, profileImage);
        return ResponseEntity.ok(ResultResponse.of(UPDATE_PROFILE_SUCCESS));
    }

    @Operation(summary = "경매 내역 - 주최한 경매")
    @GetMapping("/profiles/{nickname}/saleHost")
    public ResponseEntity<ResultResponse> getSaleByHost(@PathVariable("nickname") String nickname,
        Pageable pageable) {
        SaleListPage saleListPage = memberService.getSaleByHost(nickname, pageable);
        return ResponseEntity.ok(ResultResponse.of(GET_SALEHOST_SUCCESS, saleListPage));
    }

    @Operation(summary = "경매 내역 - 참여한 경매")
    @GetMapping("/profiles/saleParticipant")
    public ResponseEntity<ResultResponse> getSaleByParticipant(Pageable pageable) {
        SaleListPage saleListPage = memberService.getSaleByParticipant(pageable);
        return ResponseEntity.ok(ResultResponse.of(GET_PARTICIPATEDSALE_SUCCESS, saleListPage));
    }

    @Operation(summary = "참여한 경매(한 개)의 입찰 내역(1개 이상) 조회")
    @GetMapping("/profiles/saleParticipant/{saleId}")
    public ResponseEntity<ResultResponse> getBidHistoryBySaleId(
        @PathVariable("saleId") String saleId, Pageable pageable) {
        BidHistoryListPage bidHistoryListPage = memberService.getBidHistoryBySaleId(
            Long.parseLong(saleId), pageable);
        return ResponseEntity.ok(ResultResponse.of(GET_BIDHISTORY_SUCCESS, bidHistoryListPage));
    }

    @Operation(summary = "역경매 내역 - 주최한 역경매")
    @GetMapping("/profiles/{nickname}/purchaseHost")
    public ResponseEntity<ResultResponse> getPurchaseByHost(
        @PathVariable("nickname") String nickname, Pageable pageable) {
        PurchaseListPage purchaseListPage = memberService.getPurchaseByHost(nickname, pageable);
        return ResponseEntity.ok(ResultResponse.of(GET_PURCHASEHOST_SUCCESS, purchaseListPage));
    }

    @Operation(summary = "역경매 내역 - 참여한 역경매 조회")
    @GetMapping("/profiles/purchaseSeller")
    public ResponseEntity<ResultResponse> getPurchaseBySeller(Pageable pageable) {
        PurchaseListPage purchaseListPage = memberService.getPurchaseBySeller(pageable);
        return ResponseEntity.ok(
            ResultResponse.of(GET_PARTICIPATEPURCHASE_SUCCESS, purchaseListPage));
    }

    @Operation(summary = "나의 찜 목록 조회")
    @GetMapping("/profiles/wishes")
    public ResponseEntity<ResultResponse> getWish(LookupParam lookupParam) {
        if (lookupParam.getType().equals("sale")) { //경매
            SaleListPage saleListPage = memberService.getSaleWish(lookupParam);
            return ResponseEntity.ok(ResultResponse.of(GET_MYWISH_SUCCESS, saleListPage));

        } else if (lookupParam.getType().equals("purchase")) { //역경매
            PurchaseListPage purchaseListPage = memberService.getPurchaseWish(lookupParam);
            return ResponseEntity.ok(ResultResponse.of(GET_MYWISH_SUCCESS, purchaseListPage));
        }
        return ResponseEntity.ok(ResultResponse.of(GET_MYWISH_SUCCESS));
    }

    @Operation(summary = "리뷰 작성하기")
    @PostMapping("/reviews")
    public ResponseEntity<ResultResponse> createReview(
        @RequestBody MemberReviewReq memberReviewReq) {
        memberService.createReview(memberReviewReq);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ResultResponse.of(ResultCode.CREATE_REVIEW_SUCCESS));
    }

    @Operation(summary = "내가 작성한 리뷰 조회")
    @GetMapping("/reviews")
    public ResponseEntity<ResultResponse> getWroteReview(Pageable pageable) {
        ReviewListPage reviewListPage = memberService.getWroteReview(pageable);
        return ResponseEntity.ok(
            ResultResponse.of(ResultCode.GET_REVIEW_SUCCESS, reviewListPage));
    }

    @Operation(summary = "받은 리뷰 조회")
    @GetMapping("/{nickname}/reviews")
    public ResponseEntity<ResultResponse> getReceivedReview(
        @PathVariable("nickname") String nickname, Pageable pageable) {
        ReviewListPage reviewListPage = memberService.getReceivedReview(nickname, pageable);
        return ResponseEntity.ok(
            ResultResponse.of(ResultCode.GET_REVIEW_SUCCESS, reviewListPage));
    }

    @Operation(summary = "포인트 충전")
    @PostMapping("/points")
    public ResponseEntity<ResultResponse> chargePoint(@RequestBody PointChargeReq pointChargeReq) {
        memberService.chargePoint(pointChargeReq);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.POINT_CHARGE_SUCCESS));
    }
}
