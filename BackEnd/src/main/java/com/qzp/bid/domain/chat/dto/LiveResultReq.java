package com.qzp.bid.domain.chat.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LiveResultReq {

    long dealId;
    long applyFormId;
    int offerPrice;
}
