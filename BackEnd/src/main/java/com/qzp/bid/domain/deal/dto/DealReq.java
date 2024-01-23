package com.qzp.bid.domain.deal.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DealReq {

    String title;
    String content;
    String writer;
    String category;
    List<String> area;
}
