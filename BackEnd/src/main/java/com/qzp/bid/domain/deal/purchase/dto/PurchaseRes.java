package com.qzp.bid.domain.deal.purchase.dto;

import com.qzp.bid.domain.deal.dto.DealRes;
import com.qzp.bid.domain.deal.entity.DealStatus;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseRes {

    private DealRes dealRes;
    private LocalDateTime startTime;
    private int minPrice;
    private int maxPrice;
    private int memberLimit;
    private DealStatus status;
    private boolean isScrap;
    private boolean isJoinReq;
}
