package com.qzp.bid.domain.member.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
public class PointHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private PointStatus status;
    @CreatedDate
    private LocalDateTime time;
    private int amount;
}
