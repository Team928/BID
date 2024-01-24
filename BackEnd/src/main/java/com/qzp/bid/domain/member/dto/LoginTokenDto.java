package com.qzp.bid.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginTokenDto {

    private String email;
    private String accessToken;
    private String refreshToken;

}
