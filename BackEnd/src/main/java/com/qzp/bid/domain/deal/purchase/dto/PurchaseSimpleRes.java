package com.qzp.bid.domain.deal.purchase.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.qzp.bid.domain.deal.dto.DealSimpleRes;
import com.qzp.bid.domain.deal.entity.DealStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseSimpleRes {

    private DealSimpleRes dealSimpleRes;
    @JsonProperty("isWished")
    private boolean isWished; // wish 여부를 나타내는 필드
    private DealStatus status;
}
