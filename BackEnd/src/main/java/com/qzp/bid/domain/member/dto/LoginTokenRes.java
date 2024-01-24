package com.qzp.bid.domain.member.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginTokenRes extends LoginTokenDto {

    private String nickname;
    private List<String> area = new ArrayList<>();

    public LoginTokenRes(String email, String accessToken, String refreshToken) {
        super(email, accessToken, refreshToken);
    }
}
