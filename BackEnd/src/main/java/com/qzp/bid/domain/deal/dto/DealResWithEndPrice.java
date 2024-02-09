package com.qzp.bid.domain.deal.dto;


import com.qzp.bid.domain.deal.entity.Category;
import com.qzp.bid.domain.deal.entity.Deal;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DealResWithEndPrice {

    private long dealId;
    private String title;
    private String content;
    private String writer;
    private Category category;
    private List<String> images;
    private int endPrice;

    public DealResWithEndPrice(Deal deal) {
        this.dealId = deal.getId();
        this.title = deal.getTitle();
        this.content = deal.getContent();
        this.writer = deal.getWriter().getNickname();
        this.category = deal.getCategory();
    }
}
