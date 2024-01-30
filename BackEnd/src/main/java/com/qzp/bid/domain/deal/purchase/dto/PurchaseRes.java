package com.qzp.bid.domain.deal.purchase.dto;

import com.qzp.bid.domain.deal.dto.DealRes;
import com.qzp.bid.domain.deal.entity.DealStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseRes {

    private DealRes dealRes;
    private int minPrice;
    private int maxPrice;
    private int memberLimit;
    private DealStatus status;
    private boolean isScrap;
    private boolean isJoinReq;
}
