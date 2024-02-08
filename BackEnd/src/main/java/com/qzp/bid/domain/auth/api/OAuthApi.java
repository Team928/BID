package com.qzp.bid.domain.auth.api;

import com.qzp.bid.domain.auth.dto.OAuth2UserInfo;
import com.qzp.bid.domain.auth.dto.OAuthLoginReq;
import com.qzp.bid.domain.auth.dto.OAuthTokenRes;
import java.util.Map;
import lombok.AllArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.web.reactive.function.client.WebClient;

@AllArgsConstructor
public abstract class OAuthApi {

    private ClientRegistration provider;
    private OAuthLoginReq oAuthLoginReq;

    public OAuth2UserInfo loginProcess() {
        OAuthTokenRes oAuthToken = getOAuthToken(provider, oAuthLoginReq);
        Map<String, Object> param = getUserAttribute(provider,
            oAuthToken.getAccessToken());
        return makeUserInfo(param);
    }

    public abstract OAuthTokenRes getOAuthToken(ClientRegistration provider,
        OAuthLoginReq loginReq);

    private Map<String, Object> getUserAttribute(ClientRegistration clientRegistration,
        String oauth2Token) {
        return WebClient.create()
            .get()
            .uri(clientRegistration.getProviderDetails().getUserInfoEndpoint().getUri())
            .headers(header -> header.setBearerAuth(oauth2Token))
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
            })
            .block();
    }

    public abstract OAuth2UserInfo makeUserInfo(Map<String, Object> param);
}
