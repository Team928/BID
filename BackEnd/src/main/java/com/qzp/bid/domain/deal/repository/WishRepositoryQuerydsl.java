package com.qzp.bid.domain.deal.repository;

import com.qzp.bid.domain.deal.purchase.dto.PurchaseListPage;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import org.springframework.data.domain.Pageable;

public interface WishRepositoryQuerydsl {

    SaleListPage findSalesWithWishByMemberId(Long memberId, Pageable pageable);

    PurchaseListPage findPurchasesWithWishByMemberId(Long memberId, Pageable pageable);
}