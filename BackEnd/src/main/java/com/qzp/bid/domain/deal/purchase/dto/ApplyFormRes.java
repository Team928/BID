package com.qzp.bid.domain.deal.purchase.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplyFormRes {

    private long id;
    private String sellerNickname;
    private int offerPrice;
    private String image;
    private String content;
}
