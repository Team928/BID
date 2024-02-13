package com.qzp.bid.domain.member.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(value = AuditingEntityListener.class)
public class Member {

    @OneToMany
    @Builder.Default
    private List<PointHistory> pointHistory = new ArrayList<>();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String email;
    private String nickname;
    @CreatedDate
    private LocalDateTime createTime;
    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<String> area = new ArrayList<>();
    private double score;
    private int reviewCount; // 리뷰 개수
    private double totalScore; // 총 점수
    private long point;
    private long holdingPoint;
    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Set<Role> role = new HashSet<>();
    private String profileImage;

    public boolean bidding(int price) {
        if (point < price) {
            return false;
        }
        this.holdingPoint += price;
        this.point -= price;
        return true;
    }

    public void cancelBidding(int price) {
        this.holdingPoint -= price;
        this.point += price;
    }

    public void chargePoint(int point) {
        this.point += point;
    }

    public void addReview(Review review) {
        this.reviewCount += 1;
        this.totalScore += review.getScore();
    }

    public double getAverageScore() {
        if (this.reviewCount == 0) {
            return 0;
        }
        return this.totalScore / (double) this.reviewCount;
    }
}