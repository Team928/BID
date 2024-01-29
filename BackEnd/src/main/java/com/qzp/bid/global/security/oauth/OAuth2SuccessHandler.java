package com.qzp.bid.global.security.oauth;

import com.nimbusds.jose.shaded.gson.Gson;
import com.qzp.bid.domain.member.dto.LoginTokenDto;
import com.qzp.bid.domain.member.dto.LoginTokenRes;
import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.domain.member.repository.MemberRepository;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import com.qzp.bid.global.security.util.JwtProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Transactional
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProvider jwtProvider; //JWTProvider
    private final MemberRepository memberRepository;
    private final RedisTemplate redisTemplate;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        //map에 저장된 id키에 해당하는 값 반환 => member.getId()의 결과가 반환됨
        long id = Long.parseLong(oAuth2User.getName());

        String authorities = jwtProvider.getAuthorities(authentication);

        //권한에 USER가 존재한다면 LogintTokenRes 전달
        if(authorities.contains("USER")){

            Member existMember = memberRepository.findById(id).get();
            String nickname = existMember.getNickname();
            List<String> area = existMember.getArea();

            LoginTokenRes loginTokenRes = jwtProvider.getLoginResponseExist(id,authentication); //accessToken, refreshToken 생성
            loginTokenRes.setArea(area);
            loginTokenRes.setNickname(nickname);

            //Redis에 저장
            redisTemplate.opsForValue()
                .set("RTK:"+loginTokenRes.getId(), loginTokenRes.getRefreshToken(), Duration.ofDays(jwtProvider.getRefreshTokenValidityTime()));

            ResultResponse result = ResultResponse.of(ResultCode.LOGIN_SUCCESS, loginTokenRes);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8");
            Gson gson = new Gson();
            String jsonStr = gson.toJson(result);
            response.getWriter().println(jsonStr);

        } else if(authorities.contains("GUEST")){

            LoginTokenDto loginResponse = jwtProvider.getLoginResponse(id,authentication); //accessToken, refreshToken 생성

            //Redis에 저장
            redisTemplate.opsForValue()
                .set("RTK:"+loginResponse.getId(), loginResponse.getRefreshToken(), Duration.ofDays(jwtProvider.getRefreshTokenValidityTime()));

            ResultResponse result = ResultResponse.of(ResultCode.LOGIN_SUCCESS, loginResponse);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8");
            Gson gson = new Gson();
            String jsonStr = gson.toJson(result);
            response.getWriter().println(jsonStr);

        }
    }
}
