package com.qzp.bid.domain.member.service;

import com.qzp.bid.domain.member.dto.MemberJoinReq;

public interface MemberService {

    boolean checkNickname(String nickname) throws Exception;
    void register(MemberJoinReq memberJoinReq) throws Exception;

}
