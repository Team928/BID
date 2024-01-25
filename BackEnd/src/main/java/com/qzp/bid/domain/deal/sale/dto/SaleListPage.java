package com.qzp.bid.domain.deal.sale.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SaleListPage {

    List<SaleSimpleRes> saleSimpleResList;
    int pageNumber;
    int pageSize;
    boolean last;
}