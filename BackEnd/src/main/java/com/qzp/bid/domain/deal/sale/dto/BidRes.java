package com.qzp.bid.domain.deal.sale.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BidRes {

    private long id;
    private int bidPrice;
    private boolean isSuccess;
    private LocalDateTime bidTime;
    private String bidder;
}
