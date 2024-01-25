package com.qzp.bid.domain.member.service;

import com.qzp.bid.domain.member.dto.MemberJoinReq;
import com.qzp.bid.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public boolean checkNickname(String nickname) throws Exception {
        return memberRepository.existsByNickname(nickname);
    }

    @Override
    public void register(MemberJoinReq memberJoinReq) throws Exception {
        //TODO: accountUtil에서 email 가져오기
    }
}
