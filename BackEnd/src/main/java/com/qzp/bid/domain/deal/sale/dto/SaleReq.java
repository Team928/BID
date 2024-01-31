package com.qzp.bid.domain.deal.sale.dto;

import com.qzp.bid.domain.deal.dto.DealReq;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleReq {

    private DealReq dealReq;
    private int immediatePrice;
    private int startPrice;
    private LocalDateTime endTime;
}
