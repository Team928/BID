package com.qzp.bid.domain.deal.sale.dto;

import com.qzp.bid.domain.deal.dto.DealRes;
import com.qzp.bid.domain.deal.entity.DealStatus;
import com.qzp.bid.domain.deal.sale.entity.Bid;
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
    private int highestBid;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private DealStatus status;
    private int liveRequestCount;
    private boolean isScrap;
    private boolean isLiveReq;
    private List<Bid> bidList;
}
