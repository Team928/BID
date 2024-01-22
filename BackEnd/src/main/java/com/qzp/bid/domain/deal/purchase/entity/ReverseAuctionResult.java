package com.qzp.bid.domain.deal.purchase.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ReverseAuctionResult {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private int winningBid;
  private long purchaseId;
  private long sellerId;
}