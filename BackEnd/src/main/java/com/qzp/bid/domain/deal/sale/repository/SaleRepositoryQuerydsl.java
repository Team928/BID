package com.qzp.bid.domain.deal.sale.repository;

import com.qzp.bid.domain.deal.dto.SearchParam;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;

public interface SaleRepositoryQuerydsl {

    SaleListPage getSaleListPageBySearchParam(SearchParam searchParam);
}
