package com.qzp.bid.global.security.util;

import com.qzp.bid.domain.member.dto.LoginTokenDto;
import com.qzp.bid.domain.member.dto.LoginTokenRes;
import com.qzp.bid.domain.member.entity.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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

    private final Key key;

    public long getRefreshTokenValidityTime(){
        return refreshTokenValidityTime;
    }

    //access 토큰, refresh 토큰 생성
    public LoginTokenDto getLoginResponse(Member member){
        return new LoginTokenDto(member.getEmail(), generateAccessToken(member.getEmail(), getAuthorities(member)),generateRefreshToken(member.getEmail()));
    }

    //access 토큰, refresh 토큰 생성
    public LoginTokenDto getLoginResponse(String email, Authentication authentication){
        return new LoginTokenDto(email, generateAccessToken(email, getAuthorities(authentication)), generateRefreshToken(email));
    }

    //존재하는 유저의 access 토큰, refresh 토큰 생성
    public LoginTokenRes getLoginResponseExist(String email, Authentication authentication){
        return new LoginTokenRes(email, generateAccessToken(email, getAuthorities(authentication)), generateRefreshToken(email));
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

    //key setting
    public JwtProvider() {
        byte[] keyBytes = Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded();
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    //AccessToken 생성
    public String generateAccessToken(String email, String role) {
        Date expiredAt = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        return Jwts.builder()
            .setSubject(email)
            .claim("auth", role)
            .setExpiration(expiredAt)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    }

    //RefreshToken 생성
    public String generateRefreshToken(String email){
        return Jwts.builder()
            .signWith(key)
            .setSubject(email)
            .setExpiration(Date.from(ZonedDateTime.now().plusDays(refreshTokenValidityTime).toInstant()))
            .compact();
    }

    //검증
    public String validate(String accessToken) {
        Claims claims = parseClaims(accessToken);
        return claims.getSubject();
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(accessToken)
                .getBody();

        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    //토큰을 기반으로 사용자 정보를 반환 해주는 메서드
    public String parseTokenToUserInfo(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

//    //토큰의 유효성을 체크하고 Claims 정보를 반환받는 메서드
//    public Claims validateAndGetClaims(String token) {
//        try {
//            return Jwts.parserBuilder().setSigningKey(createKey()).build().parseClaimsJws(token).getBody();
//        } catch (SecurityException | MalformedJwtException | IllegalArgumentException e) {
//            throw new TokenException(JWT_MALFORM);
//        } catch (ExpiredJwtException e) {
//            throw new TokenException(JWT_EXPIRED);
//        } catch (RuntimeException e) {
//            throw new TokenException(JWT_INVALID);
//        }
//    }
//
//    // 토큰의 정보로 Authentication 가져옴
//    public Authentication getAuthentication(String accessToken) {
//        Claims claims = validateAndGetClaims(accessToken);
//
//        // 클레임에서 권한 정보 가져오기
//        if (claims.get("auth") == null) {
//            throw new TokenException(JWT_INVALID);
//        }
//        Collection<? extends GrantedAuthority> authorities =
//            Arrays.stream(claims.get("auth").toString().split(","))
//                .map(SimpleGrantedAuthority::new)
//                .collect(Collectors.toList());
//
//        // UserDetails 객체를 만들어서 Authentication 리턴
//        UserDetails principal = new User(claims.getSubject(), "", authorities);
//        return new UsernamePasswordAuthenticationToken(principal, accessToken, authorities);
//    }
//
//    // 만료되었지만 올바른 형식의 Token인지 검사.
//    public HashMap<Object,String> parseClaimsByExpiredToken(String accessToken){
//        try {
//            Jwts.parserBuilder().setSigningKey(createKey()).build().parseClaimsJws(accessToken);
//        } catch (ExpiredJwtException e) { // 토큰 검사 과정에서 토큰의 유효시간을 가장 나중에 체크하기 때문에 이전 예외에 걸리지않으면 올바른 토큰임.
//            try {
//                String[] splitJwt = accessToken.split("\\.");
//                Base64.Decoder decoder = Base64.getDecoder();
//                String payload = new String(decoder.decode(splitJwt[1].getBytes()));
//
//                return new ObjectMapper().readValue(payload, HashMap.class);
//            } catch (JsonProcessingException ex) {
//                throw new RuntimeException(ex);
//            }
//        }
//        return null;
//    }

}
