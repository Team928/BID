package com.qzp.bid.domain.deal.purchase.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ApplyForm {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long sellerId;
    private int offerPrice;
    private String image;
    private String content;
}
