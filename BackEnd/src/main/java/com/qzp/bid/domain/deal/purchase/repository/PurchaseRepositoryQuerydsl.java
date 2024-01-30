package com.qzp.bid.domain.deal.purchase.repository;

import com.qzp.bid.domain.deal.dto.SearchParam;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseListPage;

public interface PurchaseRepositoryQuerydsl {

    PurchaseListPage getPurchaseListPageBySearchParam(SearchParam searchParam);
}
