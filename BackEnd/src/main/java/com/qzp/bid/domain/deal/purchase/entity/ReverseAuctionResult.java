package com.qzp.bid.domain.deal.purchase.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReverseAuctionResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int winningBid;
    private long purchaseId;
    private long sellerId;
}
