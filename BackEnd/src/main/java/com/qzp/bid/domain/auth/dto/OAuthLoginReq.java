package com.qzp.bid.domain.auth.dto;

public interface OAuthLoginReq {

    SocialType getProviderName();

    String getAuthorizationCode();

    String getState();
}
