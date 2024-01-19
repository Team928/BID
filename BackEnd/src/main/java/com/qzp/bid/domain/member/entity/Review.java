package com.qzp.bid.domain.member.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    @CreatedDate
    LocalDateTime createTime;
    String content;
    int score; //1~5
    long dealId;
    long reviewerId;
    long targetId;
}
