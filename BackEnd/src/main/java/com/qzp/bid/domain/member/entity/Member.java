package com.qzp.bid.domain.member.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.engine.jdbc.internal.DDLFormatterImpl;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String email;
    private String nickname;
    @CreatedDate
    private LocalDateTime createTime;
    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> area;
    private double score;
    private long point;
    private long holdingPoint;
    @ElementCollection(fetch = FetchType.LAZY)
    private Set<Role> role;
    private String profileImage;
    @OneToMany
    List<PointHistory> pointHistory = new ArrayList<>();
}