package com.qzp.bid.domain.deal.scheduler;

import com.qzp.bid.domain.deal.sale.service.SaleService;
import com.qzp.bid.domain.deal.service.DealService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class auctionDealScheduler {

    private final SaleService saleService;
    private final DealService dealService;

    @Scheduled(fixedRate = 60000)
    public void auctionClosing() {
        try {
            saleService.saleClosing();
        } catch (Exception e) {
            log.warn("스케줄러 실패");
            log.warn(e.getMessage());
            e.printStackTrace();
        }
    }

    @Scheduled(fixedRate = 60000)
    public void auctionStartAlarm() {
        dealService.auctionStartAlarm();
    }
}
