package com.qzp.bid.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberReviewReq {

    private long dealId; //거래 id
    private String targetNickname; //리뷰 대상자 닉네임
    private int score; //점수
    private String content; //내용

}
