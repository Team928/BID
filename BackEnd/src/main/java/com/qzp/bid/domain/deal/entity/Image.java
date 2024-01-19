package com.qzp.bid.domain.deal.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String imageName;
    private String imagePath;
    private LocalDateTime createTime;
}
