package com.qzp.bid.domain.member.service;

import static com.qzp.bid.global.result.error.ErrorCode.MEMBER_ID_NOT_EXIST;
import static com.qzp.bid.global.result.error.ErrorCode.MEMBER_NICKNAME_NOT_EXIST;

import com.qzp.bid.domain.member.dto.MemberJoinReq;
import com.qzp.bid.domain.member.dto.MemberReviewReq;
import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.domain.member.entity.Review;
import com.qzp.bid.domain.member.entity.Role;
import com.qzp.bid.domain.member.mapper.ReviewMapper;
import com.qzp.bid.domain.member.repository.MemberRepository;
import com.qzp.bid.domain.member.repository.ReviewRepository;
import com.qzp.bid.global.result.error.exception.BusinessException;
import com.qzp.bid.global.security.util.AccountUtil;
import com.qzp.bid.global.security.util.JwtProvider;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    //Repository
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;
    //Mapper
    private final ReviewMapper reviewMapper;
    //etc
    private final JwtProvider jwtProvider;
    private final RedisTemplate redisTemplate;
    private final AccountUtil accountUtil;

    @Override
    public boolean checkNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Override
    @Transactional
    public void register(MemberJoinReq memberJoinReq) {
        long memberId = Long.parseLong(accountUtil.getLoginMemberId());
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));

        member.setNickname(memberJoinReq.getNickname());
        member.setArea(new ArrayList<>(Arrays.asList(memberJoinReq.getAddress())));

        Set<Role> roles = new HashSet<>();
        roles.add(Role.USER);
        member.setRole(roles);

        memberRepository.save(member);
    }

    @Override
    @Transactional
    public void createReview(MemberReviewReq memberReviewReq) {
        long reviewerId = Long.parseLong(accountUtil.getLoginMemberId()); //작성자 id 가져오기
        Member targetMember = memberRepository.findMemberByNickname(
                memberReviewReq.getTargetNickname())
            .orElseThrow(() -> (new BusinessException(MEMBER_NICKNAME_NOT_EXIST)));

        Review review = reviewMapper.toReview(memberReviewReq);
        review.setReviewerId(reviewerId);
        review.setTargetId(targetMember.getId());
        reviewRepository.save(review);
    }

}
