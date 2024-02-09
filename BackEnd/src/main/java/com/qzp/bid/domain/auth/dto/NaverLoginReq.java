package com.qzp.bid.domain.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NaverLoginReq implements OAuthLoginReq {

    private String authorizationCode;
    private String state;

    @Override
    public SocialType getProviderName() {
        return SocialType.naver;
    }
}
