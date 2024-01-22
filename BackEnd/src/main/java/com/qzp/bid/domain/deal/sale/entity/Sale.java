package com.qzp.bid.domain.deal.sale.entity;

import com.qzp.bid.domain.deal.entity.Deal;
import com.qzp.bid.domain.deal.entity.DealStatus;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("sale")
public class Sale extends Deal {

    private int immediatePrice;
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    private Bid highestBid;
    private int startPrice;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private DealStatus status;
    private int liveRequestCount;
}
