package com.qzp.bid.domain.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginTokenDto {

    private Long id;
    private String accessToken;
    private String refreshToken;

    public LoginTokenDto(LoginTokenDto loginTokenDto) {
        this.id = loginTokenDto.getId();
        this.accessToken = loginTokenDto.getAccessToken();
        this.refreshToken = loginTokenDto.getRefreshToken();
    }
}
