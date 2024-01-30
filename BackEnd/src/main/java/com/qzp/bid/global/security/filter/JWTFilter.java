package com.qzp.bid.global.security.filter;


import static com.qzp.bid.global.result.error.ErrorCode.*;

import com.qzp.bid.global.result.error.exception.BusinessException;
import com.qzp.bid.global.result.error.exception.TokenException;
import com.qzp.bid.global.security.util.JwtProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
@Slf4j
public class JWTFilter extends OncePerRequestFilter {

    @Value("${auth.whiteList}")
    private String[] whiteList = {"/member/**", "/deals/**", "/chat/**", "/oauth2/**", "/swagger-resources/**", "/swagger-ui/**", "v3/**", "/bid-ui.html", "/api-docs/json/**"};
    private final JwtProvider jwtProvider;
    private final RedisTemplate redisTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();
        String auth = request.getHeader(HttpHeaders.AUTHORIZATION); //헤더에서 권한정보 가져옴

        if(auth == null){
            AntPathMatcher antPathMatcher = new AntPathMatcher();
            for(String list : whiteList){
                if(antPathMatcher.match(list,path)){
                    log.info("pass token filter ......");
                    filterChain.doFilter(request, response); //다음 필터로 요청, 응답 전달
                    return;
                }
            }
        }

        try {
            String token = parseBearerToken(auth); //Request Header에서 JWT토큰(accessToken) 추출

            if(path.equals("/members/reissue")){ //토큰 재발급의 경우
                filterChain.doFilter(request, response);
                return;
            }
            //토큰 유효성 검사
            if(jwtProvider.validateAndGetClaims(token) != null){
                if(redisTemplate.opsForValue().get(token) != null){ //null이어야 함 (redis에는 refreshToken이 저장되어 있으니까)
                    throw new TokenException(BLACK_TOKEN);
                }

                // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext 에 저장
                Authentication authentication = jwtProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.info("authentication set success......");
            }
            filterChain.doFilter(request,response);
        } catch (Exception e) {
            new TokenException().sendResponseError(response);
        }
    }

    private String parseBearerToken(String auth) {
        return Optional.of(auth)
            .filter(token -> token.substring(0, 7).equalsIgnoreCase("Bearer "))
            .map(token -> token.substring(7))
            .orElseThrow(() -> new BusinessException(JWT_BADTYPE));
    }

}
