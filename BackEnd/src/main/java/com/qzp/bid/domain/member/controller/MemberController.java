package com.qzp.bid.domain.member.controller;

import static com.qzp.bid.global.result.ResultCode.*;

import com.qzp.bid.domain.member.dto.MemberJoinReq;
import com.qzp.bid.domain.member.service.MemberService;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
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
    public ResponseEntity<ResultResponse> checkNickname(@PathVariable("nickname") String nickname){
        try {
            boolean check = memberService.checkNickname(nickname);

            if(check == true){ //중복된 닉네임이 존재하는 경우
                return ResponseEntity.ok(ResultResponse.of(NICKNAME_DO_EXIST,false));
            }
            return ResponseEntity.ok(ResultResponse.of(NICKNAME_DO_NOT_EXIST,true));

        } catch (Exception e) {
            log.debug("닉네임 중복체크 에러 발생: {}", e);
            throw new RuntimeException(e);
        }
    }

    //TODO: 회원가입
    @PostMapping("/signup")
    public ResponseEntity<ResultResponse> register(@RequestBody MemberJoinReq memberJoinReq){
        log.info("register Member MemberjoinReq - {}", memberJoinReq.getAddress().toString());

        return null;
    }

    //TODO: 로그아웃
    //TODO: 회원탈퇴


}
