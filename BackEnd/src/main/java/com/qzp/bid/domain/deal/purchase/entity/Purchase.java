package com.qzp.bid.domain.deal.purchase.entity;

import com.qzp.bid.domain.deal.entity.Deal;
import com.qzp.bid.domain.deal.entity.DealStatus;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("purchase")
public class Purchase extends Deal {

    private LocalDateTime startTime;
    private int minPrice;
    private int maxPrice;
    private int memberLimit;
    private DealStatus status;
    @OneToMany
    private List<ApplyForm> applyForms = new ArrayList<>();
}
