package com.qzp.bid.domain.deal.purchase.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PurchaseListPage {

    private List<PurchaseSimpleRes> purchaseSimpleRes;
    private int pageNumber;
    private int pageSize;
    private boolean last;
}