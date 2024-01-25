package com.qzp.bid.global.security.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.domain.member.entity.Role;
import com.qzp.bid.domain.member.repository.MemberRepository;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


//리소스 서버로부터 제공받은 user data 받기 위한 것
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CustomOAuth2UserServiceImpl extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        String oauthClientName = userRequest.getClientRegistration().getClientName(); // client 이름

        String email = null;

        //네이버 응답 형식
            /*
            {"resultcode":"00",
             "message":"success",
             "response":{
                "id":"OhG07Eo61lTZo7FfQRMkGzgjOHBvoO0Ez44cp72jaYI",
                "email":"gmldnjs427@naver.com","name":"�����"
                }
            }
            */

        Member member = null;
        if (oauthClientName.equals("naver")) {

            Map<String, String> responseMap = (Map<String, String>) oAuth2User.getAttributes()
                .get("response");

            email = responseMap.get("email");
            member = saveOrUpdate(email);

        }

        Collection<? extends GrantedAuthority> authorities = member.getRole().stream()
            .map(role -> new SimpleGrantedAuthority(role.name()))
            .collect(Collectors.toList());

        Map<String, Object> map = new HashMap<>();
        map.put("email", email);

        return new DefaultOAuth2User(authorities, map ,"email");
    }


    private Member saveOrUpdate(String email) {
        Member member = memberRepository.findMemberByEmail(email);
        if(member == null) { //멤버가 존재하지 않는다면
            member = Member.builder()
                .email(email)
                .role(Collections.singleton(Role.GUEST))
                .build();

            return memberRepository.save(member);
        }
        return member; //멤버가 존재한다면
    }
}
