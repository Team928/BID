package com.qzp.bid.domain.member.controller;

import static com.qzp.bid.global.result.ResultCode.NICKNAME_DO_EXIST;
import static com.qzp.bid.global.result.ResultCode.NICKNAME_DO_NOT_EXIST;
import static com.qzp.bid.global.result.ResultCode.REGISTER_SUCCESS;

import com.qzp.bid.domain.member.dto.MemberJoinReq;
import com.qzp.bid.domain.member.dto.MemberReviewReq;
import com.qzp.bid.domain.member.service.MemberService;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import com.qzp.bid.global.result.error.ErrorCode;
import com.qzp.bid.global.result.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

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

    @PostMapping("/signup")
    public ResponseEntity<ResultResponse> register(@RequestBody MemberJoinReq memberJoinReq) {
        try {
            memberService.register(memberJoinReq);
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.REGISTER_FAIL);
        }
        return ResponseEntity.ok(ResultResponse.of(REGISTER_SUCCESS));
    }

    @PostMapping("/review")
    public ResponseEntity<ResultResponse> createReview(
        @RequestBody MemberReviewReq memberReviewReq) {
        memberService.createReview(memberReviewReq);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ResultResponse.of(ResultCode.CREATE_REVIEW_SUCCESS));
    }


}
