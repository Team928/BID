package com.qzp.bid.domain.deal.sale.service;

import com.qzp.bid.domain.deal.sale.dto.SaleReq;
import com.qzp.bid.domain.deal.sale.dto.SaleRes;
import com.qzp.bid.domain.deal.sale.dto.SaleUpdateReq;

public interface SaleService {

    void createSale(SaleReq saleReq);

    SaleRes getSale(Long saleId);

    void updateSale(Long saleId, SaleUpdateReq saleUpdateReq);

    void deleteSale(Long saleId);
}
