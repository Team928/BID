package com.qzp.bid.domain.deal.sale.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LiveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long saleId;
    private long memberId;
}
