package com.qzp.bid.domain.deal.purchase.repository;

import com.qzp.bid.domain.deal.dto.SearchParam;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseListPage;
import org.springframework.data.domain.Pageable;

public interface PurchaseRepositoryQuerydsl {

    PurchaseListPage getPurchaseListPageBySearchParam(SearchParam searchParam);

    PurchaseListPage findPurchasesByWriterId(Long writerId, Pageable pageable);

    PurchaseListPage findPurchasesBySellerId(Long sellerId, Pageable pageable);
}
