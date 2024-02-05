package com.qzp.bid.global.config;

import com.qzp.bid.global.security.filter.JWTFilter;
import com.qzp.bid.global.security.oauth.CustomOAuth2UserServiceImpl;
import com.qzp.bid.global.security.oauth.OAuth2SuccessHandler;
import com.qzp.bid.global.security.util.JwtProvider;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserServiceImpl oAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final RedisTemplate redisTemplate;
    private final JwtProvider jwtProvider;
    @Value("${auth.whiteList}")
    private String[] whiteList = {"/pub/**","/sub/**","/ws/**", "/member/**", "/deals/**", "/chat/**", "/oauth2/**",
        "/swagger-resources/**", "/swagger-ui/**", "v3/**", "/bid-ui.html", "/api-docs/json/**"};

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf((csrf) -> csrf.disable());
        http
            .formLogin((login) -> login.disable());
        http
            .httpBasic((basic) -> basic.disable());

        http
            .addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class);

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
                .requestMatchers(whiteList).permitAll()
                .anyRequest().authenticated()); //모든 사용자에 대해서 인증 요청

        http.cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configurationSource(
            corsConfigurationSource()));

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
            .requestMatchers("/static/**")
            .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    public JWTFilter jwtFilter() {
        return new JWTFilter(jwtProvider, redisTemplate);
    }

    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(
            Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(
            Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
