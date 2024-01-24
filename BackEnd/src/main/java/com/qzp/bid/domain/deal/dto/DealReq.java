package com.qzp.bid.domain.deal.dto;

import com.qzp.bid.domain.deal.entity.Category;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DealReq {

    String title;
    String content;
    String writer;
    Category category;
    List<String> area;
}
