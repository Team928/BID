package com.qzp.bid.domain.deal.purchase.dto;

import com.qzp.bid.domain.deal.dto.DealReq;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseReq {

    DealReq dealReq;
    int minPrice;
    int maxPrice;
    LocalDateTime startTime;
    int memberLimit;
}
