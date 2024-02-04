package com.qzp.bid.domain.member.service;

import static com.qzp.bid.global.result.error.ErrorCode.MEMBER_ID_NOT_EXIST;
import static com.qzp.bid.global.result.error.ErrorCode.MEMBER_NICKNAME_NOT_EXIST;

import com.qzp.bid.domain.deal.purchase.dto.PurchaseListPage;
import com.qzp.bid.domain.deal.repository.WishRepository;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import com.qzp.bid.domain.deal.sale.repository.SaleRepository;
import com.qzp.bid.domain.member.dto.LookupParam;
import com.qzp.bid.domain.member.dto.MemberJoinReq;
import com.qzp.bid.domain.member.dto.MemberProfileRes;
import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.domain.member.entity.Role;
import com.qzp.bid.domain.member.mapper.MemberMapper;
import com.qzp.bid.domain.member.repository.MemberRepository;
import com.qzp.bid.global.result.error.exception.BusinessException;
import com.qzp.bid.global.security.util.AccountUtil;
import com.qzp.bid.global.security.util.JwtProvider;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;
    private final RedisTemplate redisTemplate;
    private final AccountUtil accountUtil;
    private final MemberMapper memberMapper;
    private final SaleRepository saleRepository;
    private final WishRepository wishRepository;

    @Override
    public boolean checkNickname(String nickname) throws Exception {
        return memberRepository.existsByNickname(nickname);
    }

    @Override
    @Transactional
    public void register(MemberJoinReq memberJoinReq) throws Exception {
        long memberId = Long.parseLong(accountUtil.getLoginMemberId());
        Member member = memberRepository.findById(memberId).get();

        member.setNickname(memberJoinReq.getNickname());
        member.setArea(new ArrayList<>(Arrays.asList(memberJoinReq.getAddress())));

        Set<Role> roles = new HashSet<>();
        roles.add(Role.USER);
        member.setRole(roles);

        memberRepository.save(member);
    }

    @Override
    public MemberProfileRes getProfile(String nickname) {
        long memberId = Long.parseLong(accountUtil.getLoginMemberId());
        Member loginMember = memberRepository.findById(memberId)
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));

        Member searchMember = memberRepository.findMemberByNickname(nickname)
            .orElseThrow(() -> new BusinessException(MEMBER_NICKNAME_NOT_EXIST));

        MemberProfileRes memberProfileRes = null;

        if (loginMember.getNickname().equals(nickname)) { //내 프로필 조회 시
            memberProfileRes = memberMapper.toMemberProfileRes(loginMember);
        } else { //다른 유저 프로필 조회 시
            memberProfileRes = memberMapper.toMemberProfileRes(searchMember);
            memberProfileRes.setPoint(-1);
        }
        return memberProfileRes;
    }

    @Override
    public SaleListPage getHauction(String nickname, Pageable pageable) { //내가 주최한 경매
        Member member = memberRepository.findMemberByNickname(nickname)
            .orElseThrow(() -> new BusinessException(MEMBER_NICKNAME_NOT_EXIST));

        SaleListPage saleListPage = saleRepository.findSalesByWriterId(member.getId(), pageable);

        return saleListPage;
    }

    @Override
    public SaleListPage getSaleWish(LookupParam lookupParam) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));

        Pageable setPageable = PageRequest.of(lookupParam.getPage(), lookupParam.getSize());
        SaleListPage saleListPage = wishRepository.findSalesWithWishByMemberId(
            member.getId(), setPageable);

        return saleListPage;
    }

    @Override
    public PurchaseListPage getPurchaseWish(LookupParam lookupParam) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));

        Pageable setPageable = PageRequest.of(lookupParam.getPage(), lookupParam.getSize());
        PurchaseListPage purchaseListPage = wishRepository.findPurchasesWithWishByMemberId(
            member.getId(), setPageable);

        return purchaseListPage;
    }
}
