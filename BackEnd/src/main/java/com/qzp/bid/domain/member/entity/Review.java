package com.qzp.bid.domain.member.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;

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
