package com.qzp.bid.domain.deal.purchase.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ApplyForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long sellerId;
    private int offerPrice;
    private String image;
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    private Purchase purchase;
}
