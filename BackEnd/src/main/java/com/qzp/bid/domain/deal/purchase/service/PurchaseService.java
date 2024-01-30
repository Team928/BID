package com.qzp.bid.domain.deal.purchase.service;

import com.qzp.bid.domain.deal.purchase.dto.PurchaseReq;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseRes;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface PurchaseService {

    void createPurchase(PurchaseReq purchaseReq, List<MultipartFile> photos);

    PurchaseRes getPurchase(Long purchaseId);

    void deletePurchase(Long purchaseId);
}
