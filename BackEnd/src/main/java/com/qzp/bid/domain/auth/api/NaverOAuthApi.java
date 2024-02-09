package com.qzp.bid.domain.auth.api;

import static com.qzp.bid.global.result.error.ErrorCode.FAIL_TO_OAUTH_LOGIN;

import com.qzp.bid.domain.auth.dto.NaverTokenRes;
import com.qzp.bid.domain.auth.dto.OAuth2Info.NaverOAuth2UserInfo;
import com.qzp.bid.domain.auth.dto.OAuth2UserInfo;
import com.qzp.bid.domain.auth.dto.OAuthLoginReq;
import com.qzp.bid.domain.auth.dto.OAuthTokenRes;
import com.qzp.bid.global.result.error.exception.BusinessException;
import java.util.Map;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.web.reactive.function.client.WebClient;

public class NaverOAuthApi extends OAuthApi {

    public NaverOAuthApi(ClientRegistration provider, OAuthLoginReq oAuthLoginReq) {
        super(provider, oAuthLoginReq);
    }

    @Override
    public OAuth2UserInfo makeUserInfo(Map<String, Object> param) {
        return new NaverOAuth2UserInfo(param);
    }

    @Override
    public OAuthTokenRes getOAuthToken(ClientRegistration provider, OAuthLoginReq loginReq) {
        WebClient webClient = WebClient.builder()
            .baseUrl(provider.getProviderDetails().getTokenUri())
            .defaultHeader("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE)
            .build();
        OAuthTokenRes response = webClient.post()
            .uri(uriBuilder -> uriBuilder
                .queryParam("grant_type", provider.getAuthorizationGrantType().getValue())
                .queryParam("client_id", provider.getClientId())
                .queryParam("client_secret", provider.getClientSecret())
                .queryParam("code", loginReq.getAuthorizationCode())
                .queryParam("state", loginReq.getState())
                .build())
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(NaverTokenRes.class)
            .block();
        if (response != null) {
            return response;
        } else {
            throw new BusinessException(FAIL_TO_OAUTH_LOGIN);
        }
    }
}