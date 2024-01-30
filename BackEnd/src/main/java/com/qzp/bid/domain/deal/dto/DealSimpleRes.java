package com.qzp.bid.domain.deal.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.qzp.bid.domain.deal.entity.Category;
import com.qzp.bid.domain.deal.entity.Deal;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DealSimpleRes {

    private Long id;
    private String title;
    private String content; //purchase
    private Category category;
    private LocalDateTime createTime; //sale
    private LocalDateTime startTime;
    private String image;

    @QueryProjection
    public DealSimpleRes(Deal deal) {
        this.id = deal.getId();
        this.title = deal.getTitle();
        this.content = deal.getContent();
        this.category = deal.getCategory();
        this.createTime = deal.getCreateTime();
        this.startTime = deal.getStartTime();
        if (deal.getImages() != null && !deal.getImages().isEmpty()) {
            this.image = deal.getImages().get(0).getImagePath();
        }
    }
}