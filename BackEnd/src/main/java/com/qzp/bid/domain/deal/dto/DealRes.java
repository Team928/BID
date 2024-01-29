package com.qzp.bid.domain.deal.dto;

import com.qzp.bid.domain.deal.entity.Category;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DealRes {

    private long id;
    private String title;
    private String content;
    private String writer;
    private Category category;
    private List<String> area;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private List<String> images;
}
