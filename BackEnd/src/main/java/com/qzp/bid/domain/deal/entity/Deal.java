package com.qzp.bid.domain.deal.entity;

import com.qzp.bid.domain.member.entity.Member;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
public abstract class Deal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @CreatedDate
    private LocalDateTime createTime;
    @LastModifiedDate
    private LocalDateTime updateTime;
    private String title;
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    private Member writer;
    private Category category;
    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> area = new ArrayList<>();
    @OneToMany(fetch = FetchType.LAZY)
    private List<Image> images = new ArrayList<>();
}
