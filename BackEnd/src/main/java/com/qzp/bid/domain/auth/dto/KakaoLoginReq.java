package com.qzp.bid.domain.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoLoginReq implements OAuthLoginReq {

    private String authorizationCode;

    @Override
    public SocialType getProviderName() {
        return SocialType.kakao;
    }

    @Override
    public String getState() {
        return null;
    }
}
