package com.qzp.bid.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberProfileRes {

    private String nickname;
    private String email;
    private long point;
    private String profileImage;
    private double score;

}
