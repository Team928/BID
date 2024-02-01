package com.qzp.bid.domain.deal.purchase.dto;

import com.qzp.bid.domain.deal.dto.DealRes;
import com.qzp.bid.domain.deal.entity.DealStatus;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseRes {

    private DealRes dealRes;
    private int minPrice;
    private int maxPrice;
    private int memberLimit;
    private DealStatus status;
    private boolean isWished;
    private boolean isJoinReq;
    private List<ApplyFormRes> applyForms;
}
