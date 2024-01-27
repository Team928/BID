package com.qzp.bid.domain.deal.dto;

import com.qzp.bid.domain.deal.entity.Category;
import com.qzp.bid.domain.deal.entity.DealStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchParam {

    int page;
    int size;
    Category catg;
    String area;
    String order; // 기본 최신순 desc / 마감임박 or 시작임박  asc
    DealStatus status;
    String keyword;
}
