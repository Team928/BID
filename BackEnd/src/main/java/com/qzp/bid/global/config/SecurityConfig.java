package com.qzp.bid.global.config;

import com.qzp.bid.global.security.oauth.CustomOAuth2UserServiceImpl;
import com.qzp.bid.global.security.oauth.OAuth2SuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserServiceImpl oAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf((csrf) -> csrf.disable());
        http
            .formLogin((login) -> login.disable());
        http
            .httpBasic((basic) -> basic.disable());

        //userInfoEndpoint 설정
        // -> 데이터를 받을 수 있는 userdetail service를 등록해주는 endpoint라는 뜻
        http
            .oauth2Login(oauth2 -> oauth2
                .redirectionEndpoint(endpoint -> endpoint.baseUri("/oauth2/code/*"))
                .userInfoEndpoint(endpoint -> endpoint.userService(
                    oAuth2UserService)) //로그인 성공 시 CustomOAuthUserServiceImpl에서 후처리
                .successHandler(oAuth2SuccessHandler));

        http
            .authorizeHttpRequests((auth) -> auth
                .requestMatchers("/oauth2/**", "/member/**", "/swagger-resources/**",
                    "/swagger-ui/**", "v3/**", "/bid-ui.html", "/api-docs/json/**").permitAll()
                .anyRequest().authenticated()); //모든 사용자에 대해서 인증 요청
        return http.build();
    }
}
