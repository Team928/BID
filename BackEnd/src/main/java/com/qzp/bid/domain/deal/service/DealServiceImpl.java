package com.qzp.bid.domain.deal.service;

import static com.qzp.bid.global.result.error.ErrorCode.DEAL_ID_NOT_EXIST;
import static com.qzp.bid.global.result.error.ErrorCode.MEMBER_ID_NOT_EXIST;
import static com.qzp.bid.global.result.error.ErrorCode.WISH_ALREADY_EXIST;
import static com.qzp.bid.global.result.error.ErrorCode.WISH_NOT_EXIST;

import com.qzp.bid.domain.deal.entity.Deal;
import com.qzp.bid.domain.deal.entity.Wish;
import com.qzp.bid.domain.deal.repository.DealRepository;
import com.qzp.bid.domain.deal.repository.WishRepository;
import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.domain.sse.dto.SseDto;
import com.qzp.bid.domain.sse.dto.SseType;
import com.qzp.bid.domain.sse.service.SseService;
import com.qzp.bid.global.result.error.exception.BusinessException;
import com.qzp.bid.global.security.util.AccountUtil;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DealServiceImpl implements DealService {

    private static final long ALARM_TIME = 10L;
    private final AccountUtil accountUtil;
    private final DealRepository<Deal> dealRepository;
    private final WishRepository wishRepository;
    private final SseService sseService;

    @Override
    public void addWish(long dealId) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        Deal deal = dealRepository.findById(dealId)
            .orElseThrow(() -> new BusinessException(DEAL_ID_NOT_EXIST));

        if (wishRepository.existsByDealIdAndMemberId(deal.getId(), member.getId())) {
            throw new BusinessException(WISH_ALREADY_EXIST);
        }
        wishRepository.save(new Wish(member, deal));
    }

    @Override
    public void deleteWish(long dealId) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        Deal deal = dealRepository.findById(dealId)
            .orElseThrow(() -> new BusinessException(DEAL_ID_NOT_EXIST));

        Wish wish = wishRepository.findByMemberAndDeal(member, deal)
            .orElseThrow(() -> new BusinessException(WISH_NOT_EXIST));
        wishRepository.delete(wish);
    }

    @Override
    public void auctionStartAlarm() {
        List<Wish> wishes = wishRepository.getByIsBeforeAlarm(false);
        for (Wish wish : wishes) {
            if (wish.getDeal().getStartTime()
                .isAfter(LocalDateTime.now().minusMinutes(ALARM_TIME))) {
                sseService.send(
                    SseDto.of(wish.getMember().getId(), wish.getDeal().getId(),
                        SseType.START_AUCTION_BEFORE,
                        LocalDateTime.now()));
                wish.setBeforeAlarm(true);
            }
        }
    }
}
