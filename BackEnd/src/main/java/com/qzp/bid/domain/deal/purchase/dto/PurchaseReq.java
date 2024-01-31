package com.qzp.bid.domain.deal.purchase.dto;

import com.qzp.bid.domain.deal.dto.DealReq;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseReq {

    private DealReq dealReq;
    private int minPrice;
    private int maxPrice;
    private int memberLimit;
}
