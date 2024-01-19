package com.qzp.bid.domain.deal.sale.entity;

import com.qzp.bid.domain.member.entity.Member;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;


@Entity
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private int bidPrice;
    private boolean isSuccess;
    @CreatedDate
    private LocalDateTime bidTime;
    @ManyToOne(fetch = FetchType.LAZY)
    private Member bidder;
    @ManyToOne(fetch = FetchType.LAZY)
    private Sale sale;
}

