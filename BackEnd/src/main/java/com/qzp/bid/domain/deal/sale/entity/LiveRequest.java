package com.qzp.bid.domain.deal.sale.entity;

import com.qzp.bid.domain.member.entity.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LiveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long saleId;
    private long memberId;
}
