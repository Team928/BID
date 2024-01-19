package com.qzp.bid.domain.deal.purchase.entity;

import com.qzp.bid.domain.member.entity.Member;
import jakarta.persistence.*;

@Entity
public class ReverseAuctionResult {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private int winningBid;
    private long purchaseId;
    private long sellerId;
}
