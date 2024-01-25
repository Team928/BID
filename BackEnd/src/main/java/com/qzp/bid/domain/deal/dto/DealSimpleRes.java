package com.qzp.bid.domain.deal.dto;

import com.qzp.bid.domain.deal.entity.Category;
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
}