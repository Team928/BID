package com.qzp.bid.domain.auth.service;

import static com.qzp.bid.global.result.error.ErrorCode.FAIL_TO_OAUTH_LOGIN;

import com.qzp.bid.domain.auth.dto.KakaoTokenRes;
import com.qzp.bid.domain.auth.dto.LoginTokenDto;
import com.qzp.bid.domain.auth.dto.LoginTokenRes;
import com.qzp.bid.domain.auth.dto.OAuthLoginReq;
import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.domain.member.entity.Role;
import com.qzp.bid.domain.member.repository.MemberRepository;
import com.qzp.bid.global.result.error.exception.BusinessException;
import com.qzp.bid.global.security.util.JwtProvider;
import java.time.Duration;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final InMemoryClientRegistrationRepository inMemoryClient;
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;
    private final RedisTemplate redisTemplate;

    @Override
    public LoginTokenRes loginOauth(OAuthLoginReq loginReq) {
        ClientRegistration provider = inMemoryClient.findByRegistrationId(
            loginReq.getProviderName().name()); //provider 찾음
        KakaoTokenRes oAuth2Token = getOAuthToken(loginReq, provider); //인가코드로 oauth토큰 발급
        Member oAuthMember = loginOAuthUser(loginReq.getProviderName().name(), provider,
            oAuth2Token.getAccessToken()); //oauth토큰으로 회원 정보 가져오기

        LoginTokenDto loginTokenDto = jwtProvider.getLoginResponse(oAuthMember);
        LoginTokenRes loginTokenRes = new LoginTokenRes(loginTokenDto);
        //Redis에 저장
        redisTemplate.opsForValue()
            .set("RTK:" + loginTokenRes.getId(), loginTokenRes.getRefreshToken(),
                Duration.ofDays(jwtProvider.getRefreshTokenValidityTime()));

        if (oAuthMember.getRole().contains(Role.USER)) {
            loginTokenRes.setNickname(oAuthMember.getNickname());
            loginTokenRes.setArea(oAuthMember.getArea());
        }
        return loginTokenRes;
    }

    private KakaoTokenRes getOAuthToken(OAuthLoginReq loginReq, ClientRegistration provider) {
        WebClient webClient = WebClient.builder()
            .baseUrl(provider.getProviderDetails().getTokenUri())
            .defaultHeader("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE)
            .build();

        KakaoTokenRes response = webClient.post()
            .uri(uriBuilder -> uriBuilder
                .queryParam("grant_type", "authorization_code")
                .queryParam("client_id", provider.getClientId())
                .queryParam("redirect_uri", provider.getRedirectUri())
                .queryParam("code", loginReq.getAuthorizationCode())
                .queryParam("client_secret", provider.getClientSecret())
                .build())
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(KakaoTokenRes.class)
            .block();
        if (response != null) {
            return response;
        } else {
            throw new BusinessException(FAIL_TO_OAUTH_LOGIN);
        }
    }

    private Member loginOAuthUser(String providerName, ClientRegistration provider,
        String oAuth2Token) {

        Map<String, Object> paramMap = getUserAttribute(provider, oAuth2Token);
        Map<String, String> account = new HashMap<>();

        switch (providerName) {
            case "kakao":
                account = getKakao(paramMap);
                break;
        }
        return generateMember(account);
    }

    private Map<String, Object> getUserAttribute(ClientRegistration provider, String oauth2Token) {
        return WebClient.create()
            .get()
            .uri(provider.getProviderDetails().getUserInfoEndpoint().getUri())
            .headers(header -> header.setBearerAuth(oauth2Token))
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
            })
            .block();
    }

    private Map<String, String> getKakao(Map<String, Object> paramMap) {

        Object value = paramMap.get("kakao_account");

        LinkedHashMap accountMap = (LinkedHashMap) value;

        Map<String, String> account = new HashMap<>();
        account.put("email", (String) accountMap.get("email"));
        return account;
    }

    private Member generateMember(Map<String, String> account) {
        Optional<Member> member = memberRepository.findMemberByEmail(account.get("email"));

        return member.orElseGet(() -> createNewMember(account));
    }

    private Member createNewMember(Map<String, String> account) {
        Member m = Member.builder()
            .email(account.get("email"))
            .role(Collections.singleton(Role.GUEST))
            .build();
        return memberRepository.save(m);
    }
}