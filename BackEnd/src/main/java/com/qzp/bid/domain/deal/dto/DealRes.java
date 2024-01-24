package com.qzp.bid.domain.deal.dto;

import com.qzp.bid.domain.deal.entity.Image;
import com.qzp.bid.domain.deal.sale.entity.Sale;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DealRes {

    private long id;
    private String title;
    private String content;
    private String writer;
    private String category;
    private List<String> area;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private List<String> images;

    public DealRes(Sale sale) {
        this.id = sale.getId();
        this.title = sale.getTitle();
        this.content = sale.getContent();
        //this.writer = sale.getWriter().toString(); // TODO: member 추가 후 수정 필요
        this.category = String.valueOf(sale.getCategory());
        this.area = sale.getArea();
        this.createTime = sale.getCreateTime();
        this.updateTime = sale.getUpdateTime();
        this.images = sale.getImages().stream().map(Image::getImagePath).collect(
            Collectors.toList());

    }
}
