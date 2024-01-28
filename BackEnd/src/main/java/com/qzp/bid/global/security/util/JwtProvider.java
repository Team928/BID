package com.qzp.bid.global.security.util;

import static com.qzp.bid.global.result.error.ErrorCode.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qzp.bid.domain.member.dto.LoginTokenDto;
import com.qzp.bid.domain.member.dto.LoginTokenRes;
import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.global.result.error.exception.TokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.token-validity-time}")
    private long tokenValidityTime;
    @Value("${jwt.token-refresh-time}")
    private long refreshTokenValidityTime;

    public long getRefreshTokenValidityTime(){
        return refreshTokenValidityTime;
    }

    //access 토큰, refresh 토큰 생성한 것 LoginTokenDto에 담아서 return
    public LoginTokenDto getLoginResponse(Member member){
        return new LoginTokenDto(member.getId(), generateAccessToken(member.getId(), getAuthorities(member)),generateRefreshToken(member.getId()));
    }

    //access 토큰, refresh 토큰 생성
    public LoginTokenDto getLoginResponse(long id,
        Authentication authentication){
        return new LoginTokenDto(id, generateAccessToken(id, getAuthorities(authentication)), generateRefreshToken(id));
    }

    //존재하는 유저의 access 토큰, refresh 토큰 생성한 것 LoginTokenRes에 담아서 return
    public LoginTokenRes getLoginResponseExist(long id, Authentication authentication){
        return new LoginTokenRes(id, generateAccessToken(id, getAuthorities(authentication)), generateRefreshToken(id));
    }

    //권한 정보 가져오기 (GUEST, USER, ADMIN)
    public String getAuthorities(Member member){
        return member.getRole().stream()
            .map(role -> new SimpleGrantedAuthority(role.name()).getAuthority())
            .collect(Collectors.joining(","));
    }

    public String getAuthorities(Authentication authentication){
        return authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(","));
    }

    // key 생성
    private Key createKey(){
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    //AccessToken 생성
    public String generateAccessToken(Long id, String role) {
        //TODO: tokenValidityTime 따로 빼서 설정하기
        Date expiredAt = Date.from(Instant.now().plus(1, ChronoUnit.HOURS)); //유효 시간 1시간

        return Jwts.builder()
            .signWith(createKey())
            .setSubject(String.valueOf(id))
            .setId("ATK")
            .claim("auth", role)
            .setExpiration(expiredAt)
            .compact();
    }

    //RefreshToken 생성
    public String generateRefreshToken(long id){
        Date expiredAt = Date.from(ZonedDateTime.now().plusDays(refreshTokenValidityTime).toInstant()); //plusDays: day(일) 단위

        return Jwts.builder()
            .signWith(createKey())
            .setSubject(String.valueOf(id))
            .setId("RTK")
            .setExpiration(expiredAt)
            .compact();
    }

    //토큰을 기반으로 사용자 정보를 반환 해주는 메서드
    public String parseTokenToUserInfo(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(createKey())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    //토큰의 유효성을 체크하고 Claims 정보를 반환받는 메서드
    public Claims validateAndGetClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(createKey()).build().parseClaimsJws(token).getBody();
        } catch (SecurityException | MalformedJwtException | IllegalArgumentException e) {
            throw new TokenException(JWT_MALFORM);
        } catch (ExpiredJwtException e) {
            throw new TokenException(JWT_EXPIRED);
        } catch (RuntimeException e) {
            throw new TokenException(JWT_INVALID);
        }
    }

    // 토큰의 정보로 Authentication 가져옴
    public Authentication getAuthentication(String accessToken) {
        Claims claims = validateAndGetClaims(accessToken);

        // 클레임에서 권한 정보 가져오기
        if (claims.get("auth") == null) {
            throw new TokenException(JWT_INVALID);
        }
        Collection<? extends GrantedAuthority> authorities =
            Arrays.stream(claims.get("auth").toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());


        // UserDetails 객체를 만들어서 Authentication 리턴
        UserDetails principal = new User(claims.getSubject(), "", authorities);

        //인증 완료된 사용자의 인증 정보와 권한 정보를 Spring Security에 전달
        return new UsernamePasswordAuthenticationToken(principal, accessToken, authorities);
    }

    // 만료되었지만 올바른 형식의 Token인지 검사.
    public HashMap<Object,String> parseClaimsByExpiredToken(String accessToken){
        try {
            Jwts.parserBuilder().setSigningKey(createKey()).build().parseClaimsJws(accessToken);
        } catch (ExpiredJwtException e) { // 토큰 검사 과정에서 토큰의 유효시간을 가장 나중에 체크하기 때문에 이전 예외에 걸리지않으면 올바른 토큰임.
            try {
                String[] splitJwt = accessToken.split("\\.");
                Base64.Decoder decoder = Base64.getDecoder();
                String payload = new String(decoder.decode(splitJwt[1].getBytes()));

                return new ObjectMapper().readValue(payload, HashMap.class);
            } catch (JsonProcessingException ex) {
                throw new RuntimeException(ex);
            }
        }
        return null;
    }

}
