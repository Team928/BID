package com.qzp.bid.domain.deal.purchase.dto;

import com.qzp.bid.domain.deal.dto.DealReq;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseReq {

    DealReq dealReq;
    int minPrice;
    int maxPrice;
    int memberLimit;
}
