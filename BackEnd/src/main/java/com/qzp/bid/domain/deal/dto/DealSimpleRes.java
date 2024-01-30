package com.qzp.bid.domain.deal.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.qzp.bid.domain.deal.entity.Category;
import com.qzp.bid.domain.deal.sale.entity.Sale;
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
    public DealSimpleRes(Sale sale) {
        this.id = sale.getId();
        this.title = sale.getTitle();
        this.content = sale.getContent();
        this.category = sale.getCategory();
        this.createTime = sale.getCreateTime();
        this.startTime = sale.getStartTime();
        if (sale.getImages() != null && sale.getImages().size() > 0) {
            this.image = sale.getImages().get(0).getImagePath();
        }
    }
}