package com.qzp.bid.domain.member.service;

import com.qzp.bid.domain.auth.dto.LoginTokenRes;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseListPage;
import com.qzp.bid.domain.deal.sale.dto.BidHistoryListPage;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import com.qzp.bid.domain.member.dto.LookupParam;
import com.qzp.bid.domain.member.dto.MemberJoinReq;
import com.qzp.bid.domain.member.dto.MemberProfileRes;
import com.qzp.bid.domain.member.dto.MemberReviewReq;
import com.qzp.bid.domain.member.dto.MemberUpdateProfileReq;
import com.qzp.bid.domain.member.dto.PointChargeReq;
import com.qzp.bid.domain.member.dto.PointHistoryListPage;
import com.qzp.bid.domain.member.dto.ReviewListPage;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    boolean checkNickname(String nickname);

    LoginTokenRes register(MemberJoinReq memberJoinReq);

    MemberProfileRes getProfile(String nickname);

    void updateProfile(MemberUpdateProfileReq memberUpdateProfileReq, MultipartFile profileImage);

    SaleListPage getSaleByHost(String nickname, Pageable pageable);

    SaleListPage getSaleByParticipant(Pageable pageable);

    BidHistoryListPage getBidHistoryBySaleId(long saleId, Pageable pageable);

    PurchaseListPage getPurchaseByHost(String nickname, Pageable pageable);

    PurchaseListPage getPurchaseBySeller(Pageable pageable);

    void createReview(MemberReviewReq memberReviewReq);

    SaleListPage getSaleWish(LookupParam lookupParam);

    PurchaseListPage getPurchaseWish(LookupParam lookupParam);

    ReviewListPage getWroteReview(Pageable pageable);

    ReviewListPage getReceivedReview(String nickname, Pageable pageable);

    void chargePoint(PointChargeReq pointChargeReq);

    PointHistoryListPage getPaymentHistory(Pageable pageable);
}
