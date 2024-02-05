package com.qzp.bid.domain.deal.scheduler;

import com.qzp.bid.domain.deal.sale.service.SaleService;
import com.qzp.bid.domain.deal.service.DealService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Component
@Transactional
public class auctionDealScheduler {

    private final SaleService saleService;
    private final DealService dealService;

    @Scheduled(fixedRate = 60000)
    public void auctionClosing() {
        saleService.saleClosing();
    }

    @Scheduled(fixedRate = 60000)
    public void auctionStartAlarm() {
        dealService.auctionStartAlarm();
    }
}
