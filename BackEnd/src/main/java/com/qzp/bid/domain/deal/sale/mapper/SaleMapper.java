package com.qzp.bid.domain.deal.sale.mapper;

import com.qzp.bid.domain.deal.mapper.DealMapper;
import com.qzp.bid.domain.deal.sale.dto.SaleReq;
import com.qzp.bid.domain.deal.sale.dto.SaleRes;
import com.qzp.bid.domain.deal.sale.entity.Sale;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = DealMapper.class)
public interface SaleMapper {

    @Mapping(source = "dealReq.title", target = "title")
    @Mapping(source = "dealReq.content", target = "content")
    @Mapping(target = "status", constant = "BEFORE")
    @Mapping(source = "dealReq.category", target = "category")
    @Mapping(source = "dealReq.area", target = "area")
    @Mapping(source = "dealReq.startTime", target = "startTime")
    Sale toSale(SaleReq saleReq);

    @Mapping(source = ".", target = "dealRes")
    @Mapping(source = "highestBid.bidPrice", target = "highestBid")
    SaleRes toSaleRes(Sale sale);
}
