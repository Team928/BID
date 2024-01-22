package com.qzp.bid.domain.deal.sale.entity;

import com.qzp.bid.domain.member.entity.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;


@Entity
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

