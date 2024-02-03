package com.qzp.bid.domain.member.service;

import com.qzp.bid.domain.member.dto.LoginTokenRes;
import com.qzp.bid.domain.member.dto.MemberJoinReq;

public interface MemberService {

    boolean checkNickname(String nickname);
    LoginTokenRes register(MemberJoinReq memberJoinReq);

}
