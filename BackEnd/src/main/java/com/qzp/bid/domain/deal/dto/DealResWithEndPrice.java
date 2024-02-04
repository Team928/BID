package com.qzp.bid.domain.deal.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DealResWithEndPrice extends DealRes {

    private int endPrice;

    public DealResWithEndPrice(DealRes dealRes) {
        super(dealRes.getId(), dealRes.getTitle(), dealRes.getContent(), dealRes.getWriter(),
            dealRes.getCategory(), dealRes.getArea(), dealRes.getCreateTime(),
            dealRes.getUpdateTime(),
            dealRes.getImages(), dealRes.getStartTime());

    }
}
