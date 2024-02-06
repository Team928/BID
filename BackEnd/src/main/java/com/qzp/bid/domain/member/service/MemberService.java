package com.qzp.bid.domain.member.service;

import com.qzp.bid.domain.deal.purchase.dto.PurchaseListPage;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import com.qzp.bid.domain.member.dto.LoginTokenRes;
import com.qzp.bid.domain.member.dto.LookupParam;
import com.qzp.bid.domain.member.dto.MemberJoinReq;
import com.qzp.bid.domain.member.dto.MemberProfileRes;
import com.qzp.bid.domain.member.dto.MemberReviewReq;
import com.qzp.bid.domain.member.dto.ReviewListPage;
import org.springframework.data.domain.Pageable;

public interface MemberService {

    boolean checkNickname(String nickname);

    LoginTokenRes register(MemberJoinReq memberJoinReq);

    MemberProfileRes getProfile(String nickname);

    SaleListPage getSaleByHost(String nickname, Pageable pageable);

    PurchaseListPage getPurchaseByHost(String nickname, Pageable pageable);

    void createReview(MemberReviewReq memberReviewReq);

    SaleListPage getSaleWish(LookupParam lookupParam);

    PurchaseListPage getPurchaseWish(LookupParam lookupParam);

    ReviewListPage getReviewsIWrote(Pageable pageable);

}
