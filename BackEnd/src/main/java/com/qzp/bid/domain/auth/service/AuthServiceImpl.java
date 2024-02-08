package com.qzp.bid.domain.auth.service;

import com.qzp.bid.domain.auth.api.KakaoOAuthApi;
import com.qzp.bid.domain.auth.api.OAuthApi;
import com.qzp.bid.domain.auth.dto.LoginTokenDto;
import com.qzp.bid.domain.auth.dto.LoginTokenRes;
import com.qzp.bid.domain.auth.dto.OAuth2UserInfo;
import com.qzp.bid.domain.auth.dto.OAuthLoginReq;
import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.domain.member.entity.Role;
import com.qzp.bid.domain.member.repository.MemberRepository;
import com.qzp.bid.global.security.util.JwtProvider;
import java.time.Duration;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.stereotype.Service;

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
        OAuthApi oAuthApi = null;
        switch (loginReq.getProviderName()) {
            case kakao -> oAuthApi = new KakaoOAuthApi(provider, loginReq);
        }
        OAuth2UserInfo oAuth2UserInfo = oAuthApi.loginProcess();
        Member member = memberRepository.findMemberByEmail(oAuth2UserInfo.getEmail())
            .orElseGet(() -> createNewMember(oAuth2UserInfo));

        LoginTokenDto loginTokenDto = jwtProvider.getLoginResponse(member);
        LoginTokenRes loginTokenRes = new LoginTokenRes(loginTokenDto);
        //Redis에 저장
        redisTemplate.opsForValue()
            .set("RTK:" + loginTokenRes.getId(), loginTokenRes.getRefreshToken(),
                Duration.ofDays(jwtProvider.getRefreshTokenValidityTime()));

        if (member.getRole().contains(Role.USER)) {
            loginTokenRes.setNickname(member.getNickname());
            loginTokenRes.setArea(member.getArea());
        }
        return loginTokenRes;
    }

    private Member createNewMember(OAuth2UserInfo oAuth2UserInfo) {
        Member m = Member.builder()
            .email(oAuth2UserInfo.getEmail())
            .role(Collections.singleton(Role.GUEST))
            .build();
        return memberRepository.save(m);
    }
}