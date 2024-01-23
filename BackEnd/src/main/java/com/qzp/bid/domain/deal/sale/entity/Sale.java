package com.qzp.bid.domain.deal.sale.entity;

import com.qzp.bid.domain.deal.entity.Deal;
import com.qzp.bid.domain.deal.entity.DealStatus;
import com.qzp.bid.domain.deal.sale.dto.SaleReq;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("sale")
public class Sale extends Deal {

    private int immediatePrice;
    @OneToOne(fetch = FetchType.LAZY)
    private Bid highestBid;
    private int startPrice;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    @Enumerated(EnumType.STRING)
    private DealStatus status;
    private int liveRequestCount;

    public Sale(SaleReq saleReq) {
        super(saleReq.getDealReq());
        this.immediatePrice = saleReq.getImmediatePrice();
        this.startPrice = saleReq.getStartPrice();
        this.startTime = saleReq.getStartTime();
        this.endTime = saleReq.getEndTime();
        this.status = DealStatus.BEFORE;
    }
}
