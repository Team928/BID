package com.qzp.bid.domain.member.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Setter
@EntityListeners(value = AuditingEntityListener.class)
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @CreatedDate
    LocalDateTime createTime;
    String content;
    int score; //1~5
    long dealId; //거래 id
    long reviewerId; //리뷰 작성자 id
    long targetId; //리뷰 대상자 id
    String role; //거래 role (buyer 또는 seller)
}
