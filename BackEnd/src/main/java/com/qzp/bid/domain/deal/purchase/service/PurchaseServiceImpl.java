package com.qzp.bid.domain.deal.purchase.service;

import com.qzp.bid.domain.deal.purchase.dto.PurchaseReq;
import com.qzp.bid.domain.deal.purchase.entity.Purchase;
import com.qzp.bid.domain.deal.purchase.mapper.PuchaseMapper;
import com.qzp.bid.domain.deal.purchase.repository.PurchaseRepository;
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
    private final PuchaseMapper puchaseMapper;

    @Override
    public void createPurchase(PurchaseReq purchaseReq) {
        Purchase purchase = puchaseMapper.toPurchase(purchaseReq);
        purchaseRepository.save(purchase);
    }
}
