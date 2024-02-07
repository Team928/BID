package com.qzp.bid.domain.member.service;

import static com.qzp.bid.global.result.error.ErrorCode.DEAL_ID_NOT_EXIST;
import static com.qzp.bid.global.result.error.ErrorCode.MEMBER_ID_NOT_EXIST;
import static com.qzp.bid.global.result.error.ErrorCode.MEMBER_NICKNAME_NOT_EXIST;

import com.qzp.bid.domain.deal.purchase.dto.PurchaseListPage;
import com.qzp.bid.domain.deal.purchase.repository.PurchaseRepository;
import com.qzp.bid.domain.deal.repository.DealRepository;
import com.qzp.bid.domain.deal.repository.WishRepository;
import com.qzp.bid.domain.deal.sale.dto.BidHistoryListPage;
import com.qzp.bid.domain.deal.sale.dto.BidRes;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import com.qzp.bid.domain.deal.sale.entity.Bid;
import com.qzp.bid.domain.deal.sale.mapper.BidMapper;
import com.qzp.bid.domain.deal.sale.repository.BidRepository;
import com.qzp.bid.domain.deal.sale.repository.SaleRepository;
import com.qzp.bid.domain.member.dto.LoginTokenDto;
import com.qzp.bid.domain.member.dto.LoginTokenRes;
import com.qzp.bid.domain.member.dto.LookupParam;
import com.qzp.bid.domain.member.dto.MemberJoinReq;
import com.qzp.bid.domain.member.dto.MemberProfileRes;
import com.qzp.bid.domain.member.dto.MemberReviewReq;
import com.qzp.bid.domain.member.dto.PointChargeReq;
import com.qzp.bid.domain.member.dto.ReviewListPage;
import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.domain.member.entity.PointHistory;
import com.qzp.bid.domain.member.entity.PointStatus;
import com.qzp.bid.domain.member.entity.Review;
import com.qzp.bid.domain.member.entity.Role;
import com.qzp.bid.domain.member.mapper.MemberMapper;
import com.qzp.bid.domain.member.mapper.ReviewMapper;
import com.qzp.bid.domain.member.repository.MemberRepository;
import com.qzp.bid.domain.member.repository.PointHistoryRepository;
import com.qzp.bid.domain.member.repository.ReviewRepository;
import com.qzp.bid.global.result.error.exception.BusinessException;
import com.qzp.bid.global.security.util.AccountUtil;
import com.qzp.bid.global.security.util.JwtProvider;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
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
    private final DealRepository dealRepository;
    private final SaleRepository saleRepository;
    private final WishRepository wishRepository;
    private final PointHistoryRepository pointHistoryRepository;
    private final PurchaseRepository purchaseRepository;
    private final BidRepository bidRepository;
    //Mapper
    private final MemberMapper memberMapper;
    private final ReviewMapper reviewMapper;
    private final BidMapper bidMapper;
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
    public LoginTokenRes register(MemberJoinReq memberJoinReq) {
        long memberId = Long.parseLong(accountUtil.getLoginMemberId());
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));

        member.setNickname(memberJoinReq.getNickname());
        member.setArea(new ArrayList<>(Arrays.asList(memberJoinReq.getAddress())));

        Set<Role> roles = new HashSet<>();
        roles.add(Role.USER);
        member.setRole(roles);

        memberRepository.save(member);

        LoginTokenDto loginTokenDto = jwtProvider.getLoginResponse(member);
        LoginTokenRes loginTokenRes = memberMapper.toLoginTokenRes(member, loginTokenDto);

        return loginTokenRes;
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
    public SaleListPage getSaleByHost(String nickname, Pageable pageable) { //내가 주최한 경매
        Member member = memberRepository.findMemberByNickname(nickname)
            .orElseThrow(() -> new BusinessException(MEMBER_NICKNAME_NOT_EXIST));

        SaleListPage saleListPage = saleRepository.findSalesByWriterId(member.getId(), pageable);

        return saleListPage;
    }

    @Override
    public SaleListPage getSaleByParticipant(Pageable pageable) {
        long memberId = Long.parseLong(accountUtil.getLoginMemberId());
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));

        SaleListPage saleListPage = saleRepository.findSalesByParticipantId(member.getId(),
            pageable);

        return saleListPage;
    }

    @Override
    public BidHistoryListPage getBidHistoryBySaleId(long saleId, Pageable pageable) {
        long memberId = Long.parseLong(accountUtil.getLoginMemberId());
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));

        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
            Sort.by("id").descending());
        Slice<Bid> bids = bidRepository.findBySaleIdAndBidderId(saleId,
            member.getId(), sortedPageable);

        List<BidRes> bidResList = bidMapper.toBidResList(bids);
        boolean last = bids.hasNext();

        return new BidHistoryListPage(bidResList, bids.getNumber(), bids.getSize(), !last);
    }

    @Override
    public PurchaseListPage getPurchaseByHost(String nickname, Pageable pageable) {
        Member member = memberRepository.findMemberByNickname(nickname)
            .orElseThrow(() -> new BusinessException(MEMBER_NICKNAME_NOT_EXIST));

        PurchaseListPage purchaseListPage = purchaseRepository.findPurchasesByWriterId(
            member.getId(), pageable);

        return purchaseListPage;
    }

    @Override
    public PurchaseListPage getPurchaseBySeller(Pageable pageable) {
        long memberId = Long.parseLong(accountUtil.getLoginMemberId());
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));

        PurchaseListPage purchaseListPage = purchaseRepository.findPurchasesBySellerId(
            member.getId(), pageable);
        return purchaseListPage;
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

    @Override
    @Transactional
    public void createReview(MemberReviewReq memberReviewReq) {
        long reviewerId = Long.parseLong(accountUtil.getLoginMemberId()); //작성자 id 가져오기
        Member targetMember = memberRepository.findMemberByNickname(
                memberReviewReq.getTargetNickname())
            .orElseThrow(() -> (new BusinessException(MEMBER_NICKNAME_NOT_EXIST)));

        String role;

        if (dealRepository.existsByIdAndWriterId(memberReviewReq.getDealId(), reviewerId)) {
            //존재할 때
            //sale에 존재한다면 -> seller
            if (saleRepository.existsById(memberReviewReq.getDealId())) {
                role = "seller";
            } else { //sale에 존재하지 않는다면 -> purchase에 존재하는 것 -> buyer
                role = "buyer";
            }
        } else {
            //(거래 아이디+리뷰 작성자) 맞는 것이 존재하지 않을 때
            throw new BusinessException(DEAL_ID_NOT_EXIST);
        }

        Review review = reviewMapper.toReview(memberReviewReq);
        review.setReviewerId(reviewerId);
        review.setTargetId(targetMember.getId());
        review.setRole(role);
        reviewRepository.save(review);
    }

    public ReviewListPage getReviewsIWrote(Pageable pageable) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));

        ReviewListPage reviewListPage = reviewRepository.getReviewListPageByWriterId(member.getId(),
            pageable);
        return reviewListPage;
    }


    @Transactional
    @Override
    public void chargePoint(PointChargeReq pointChargeReq) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        member.chargePoint(pointChargeReq.getAmount());
        PointHistory pointHistory = PointHistory.builder()
            .amount(pointChargeReq.getAmount())
            .status(PointStatus.CHARGE)
            .time(LocalDateTime.now()).build();
        member.getPointHistory().add(pointHistory);
        pointHistoryRepository.save(pointHistory);
    }
}
