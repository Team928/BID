package com.qzp.bid.domain.auth.dto;

public interface OAuthLoginReq {

    default SocialType getProviderName() {
        return null;
    }

    default String getAuthorizationCode() {
        return null;
    }

    default String getState() {
        return null;
    }
}
