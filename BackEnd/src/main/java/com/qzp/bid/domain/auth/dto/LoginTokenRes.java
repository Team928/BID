package com.qzp.bid.domain.auth.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginTokenRes extends LoginTokenDto {

    private String nickname;
    private List<String> area = new ArrayList<>();

    public LoginTokenRes(Long id, String accessToken, String refreshToken) {
        super(id, accessToken, refreshToken);
    }

    public LoginTokenRes(LoginTokenDto loginTokenDto, String nickname, List<String> area) {
        super(loginTokenDto);
        this.nickname = nickname;
        this.area = area;
    }

    public LoginTokenRes(LoginTokenDto loginTokenDto) {
        super(loginTokenDto);
    }
}
