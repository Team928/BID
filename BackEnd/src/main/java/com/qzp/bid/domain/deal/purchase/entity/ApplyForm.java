package com.qzp.bid.domain.deal.purchase.entity;

import com.qzp.bid.domain.member.entity.Member;
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
    @ManyToOne(fetch = FetchType.LAZY)
    private Member seller;
    private int offerPrice;
    private String image;
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    private Purchase purchase;
}
