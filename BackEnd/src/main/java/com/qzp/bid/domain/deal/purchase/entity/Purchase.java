package com.qzp.bid.domain.deal.purchase.entity;

import com.qzp.bid.domain.deal.entity.Deal;
import com.qzp.bid.domain.deal.entity.DealStatus;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("purchase")
public class Purchase extends Deal {

    private LocalDateTime startTime;
    private int minPrice;
    private int maxPrice;
    private int memberLimit;
    @Enumerated(EnumType.STRING)
    private DealStatus status;
    @OneToMany
    private List<ApplyForm> applyForms = new ArrayList<>();
}
