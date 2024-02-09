package com.qzp.bid.domain.auth.controller;

import static com.qzp.bid.global.result.ResultCode.LOGIN_SUCCESS;

import com.qzp.bid.domain.auth.dto.KakaoLoginReq;
import com.qzp.bid.domain.auth.dto.LoginTokenRes;
import com.qzp.bid.domain.auth.service.AuthService;
import com.qzp.bid.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "AuthController", description = "로그인 관련 api")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login/kakao")
    public ResponseEntity<ResultResponse> loginOauth(@RequestBody KakaoLoginReq kakaoLoginReq) {
        LoginTokenRes loginOauth = authService.loginOauth(kakaoLoginReq);
        return ResponseEntity.ok(ResultResponse.of(LOGIN_SUCCESS, loginOauth));
    }
}
