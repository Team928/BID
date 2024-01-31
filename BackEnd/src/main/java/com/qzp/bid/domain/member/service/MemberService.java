package com.qzp.bid.domain.member.service;

import com.qzp.bid.domain.member.dto.MemberJoinReq;
import com.qzp.bid.domain.member.dto.MemberReviewReq;

public interface MemberService {

    boolean checkNickname(String nickname);

    void register(MemberJoinReq memberJoinReq);

    void createReview(MemberReviewReq memberReviewReq);

}
