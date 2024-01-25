package com.qzp.bid.domain.deal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchParam {

    int page;
    int size;
    String catg;
    String area;
    String order;
    String status;
    String keyword;
}
