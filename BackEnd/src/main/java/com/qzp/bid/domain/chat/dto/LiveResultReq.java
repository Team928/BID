package com.qzp.bid.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class LiveResultReq {

    long dealId;
    long applyFormId;
    int offerPrice;
}
