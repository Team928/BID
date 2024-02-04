package com.qzp.bid.domain.member.service;

import com.qzp.bid.domain.deal.purchase.dto.PurchaseListPage;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import com.qzp.bid.domain.member.dto.LookupParam;
import com.qzp.bid.domain.member.dto.MemberJoinReq;
import com.qzp.bid.domain.member.dto.MemberProfileRes;
import org.springframework.data.domain.Pageable;

public interface MemberService {

    boolean checkNickname(String nickname) throws Exception;

    void register(MemberJoinReq memberJoinReq) throws Exception;

    MemberProfileRes getProfile(String nickname);

    SaleListPage getHauction(String nickname, Pageable pageable);

    SaleListPage getSaleWish(LookupParam lookupParam);

    PurchaseListPage getPurchaseWish(LookupParam lookupParam);
}
