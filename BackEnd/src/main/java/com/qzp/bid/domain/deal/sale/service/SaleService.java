package com.qzp.bid.domain.deal.sale.service;

import com.qzp.bid.domain.deal.sale.dto.SaleReq;
import com.qzp.bid.domain.deal.sale.dto.SaleRes;

public interface SaleService {

    void createSale(SaleReq saleReq);

    SaleRes getSale(Long saleId);

    void deleteSale(Long saleId);
}
