package com.qzp.bid.domain.deal.purchase.service;

import static com.qzp.bid.global.result.error.ErrorCode.GET_PURCHASE_FAIL;

import com.qzp.bid.domain.deal.purchase.dto.PurchaseReq;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseRes;
import com.qzp.bid.domain.deal.purchase.entity.Purchase;
import com.qzp.bid.domain.deal.purchase.mapper.PurchaseMapper;
import com.qzp.bid.domain.deal.purchase.repository.PurchaseRepository;
import com.qzp.bid.global.result.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final PurchaseMapper purchaseMapper;

    @Override
    public void createPurchase(PurchaseReq purchaseReq) {
        Purchase purchase = purchaseMapper.toPurchase(purchaseReq);
        purchaseRepository.save(purchase);
    }

    @Override
    public PurchaseRes getPurchase(Long purchaseId) {
        Purchase purchase = purchaseRepository.findById(purchaseId)
            .orElseThrow(() -> new BusinessException(GET_PURCHASE_FAIL));
        return purchaseMapper.toPurchaseRes(purchase);
    }

    @Override
    public void deletePurchase(Long purchaseId) {
        purchaseRepository.deleteById(purchaseId);
    }
}
