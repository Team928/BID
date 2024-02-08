package com.qzp.bid.domain.auth.dto;

import java.util.Map;

public class OAuth2Info {

    public static class KakaoOAuth2UserInfo extends OAuth2UserInfo {

        public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
            super(attributes);
        }

        @Override
        public String getEmail() {
            Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");

            if (account == null) {
                return null;
            }

            return (String) account.get("email");
        }

        @Override
        public String getId() {
            return attributes.get("id").toString();
        }
    }
}
