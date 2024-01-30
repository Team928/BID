package com.qzp.bid.domain.deal.purchase.mapper;

import com.qzp.bid.domain.deal.mapper.DealMapper;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseReq;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseRes;
import com.qzp.bid.domain.deal.purchase.entity.Purchase;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = DealMapper.class)
public interface PurchaseMapper {

    @Mapping(source = "dealReq.title", target = "title")
    @Mapping(source = "dealReq.content", target = "content")
    @Mapping(target = "status", constant = "BEFORE")
    @Mapping(source = "dealReq.category", target = "category")
    @Mapping(source = "dealReq.area", target = "area")
    @Mapping(source = "dealReq.startTime", target = "startTime")
    Purchase toPurchase(PurchaseReq purchaseReq);

    @Mapping(source = ".", target = "dealRes")
    PurchaseRes toPurchaseRes(Purchase purchase);
}
