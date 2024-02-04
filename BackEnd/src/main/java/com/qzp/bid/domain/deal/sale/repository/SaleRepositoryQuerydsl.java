package com.qzp.bid.domain.deal.sale.repository;

import com.qzp.bid.domain.deal.dto.SearchParam;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import org.springframework.data.domain.Pageable;

public interface SaleRepositoryQuerydsl {

    SaleListPage getSaleListPageBySearchParam(SearchParam searchParam);

    SaleListPage findSalesByWriterId(Long writerId, Pageable pageable);

}
