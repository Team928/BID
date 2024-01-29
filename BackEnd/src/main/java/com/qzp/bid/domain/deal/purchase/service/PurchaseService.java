package com.qzp.bid.domain.deal.purchase.service;

import com.qzp.bid.domain.deal.purchase.dto.PurchaseReq;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseRes;

public interface PurchaseService {

    void createPurchase(PurchaseReq purchaseReq);

    PurchaseRes getPurchase(Long purchaseId);

    void deletePurchase(Long purchaseId);
}
