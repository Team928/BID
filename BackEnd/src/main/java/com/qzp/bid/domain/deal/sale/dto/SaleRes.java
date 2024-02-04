package com.qzp.bid.domain.deal.sale.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.qzp.bid.domain.deal.dto.DealRes;
import com.qzp.bid.domain.deal.entity.DealStatus;
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
    private LocalDateTime endTime;
    private DealStatus status;
    private int liveRequestCount;
    @JsonProperty("isWished")
    private boolean isWished;
    private boolean isLiveReq;
    private List<BidRes> bidList;
}
