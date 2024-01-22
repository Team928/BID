package com.qzp.bid.domain.member.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.springframework.data.annotation.CreatedDate;

@Entity
public class Member {

    @OneToMany
    List<PointHistory> pointHistory = new ArrayList<>();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
}