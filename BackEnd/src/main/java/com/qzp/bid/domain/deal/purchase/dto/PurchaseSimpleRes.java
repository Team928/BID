package com.qzp.bid.domain.deal.purchase.dto;

import com.qzp.bid.domain.deal.dto.DealSimpleRes;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseSimpleRes {

    private DealSimpleRes dealSimpleRes;
    private boolean isWished; // wish 여부를 나타내는 필드
}
