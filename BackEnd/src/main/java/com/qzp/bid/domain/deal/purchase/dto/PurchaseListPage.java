package com.qzp.bid.domain.deal.purchase.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PurchaseListPage {

    List<PurchaseSimpleRes> purchaseSimpleRes;
    int pageNumber;
    int pageSize;
    boolean last;
}