package com.qzp.bid.domain.deal.sale.dto;

import com.qzp.bid.domain.deal.dto.DealRes;
import com.qzp.bid.domain.deal.entity.DealStatus;
import com.qzp.bid.domain.deal.sale.entity.Bid;
import com.qzp.bid.domain.deal.sale.entity.Sale;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleRes {

    private DealRes dealRes;
    private int immediatePrice;
    private int startPrice;
    private Bid bid;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private DealStatus status;
    private int liveRequestCount;
    private boolean isScrap;
    private boolean isLiveReq;
    private List<Bid> bidList;

    public SaleRes(Sale sale) {
        this.dealRes = new DealRes(sale);
        this.immediatePrice = sale.getImmediatePrice();
        this.startPrice = sale.getStartPrice();
        this.bid = sale.getHighestBid();
        this.startTime = sale.getStartTime();
        this.endTime = sale.getEndTime();
        this.status = sale.getStatus();
        this.liveRequestCount = sale.getLiveRequestCount();
//        this.bidList = sale.getBidList();
//        this.bidList.sort((o1, o2) -> o2.getBidPrice() - o1.getBidPrice()); // 최고가 높은 순서로 정렬
//        this.bidList.forEach(bid -> bid.setBidder(null)); // 유저 정보 제거 (응답 시 유
    }
}
