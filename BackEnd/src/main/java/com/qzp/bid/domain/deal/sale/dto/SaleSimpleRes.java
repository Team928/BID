package com.qzp.bid.domain.deal.sale.dto;

import com.qzp.bid.domain.deal.dto.DealSimpleRes;
import com.qzp.bid.domain.deal.entity.DealStatus;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleSimpleRes {

    private DealSimpleRes dealSimpleRes;
    private int immediate_price;
    private int startPrice;
    private LocalDateTime endTime;
    private int bid;
    private DealStatus status;
}