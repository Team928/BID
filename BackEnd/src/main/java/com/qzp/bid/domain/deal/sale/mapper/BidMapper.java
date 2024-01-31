package com.qzp.bid.domain.deal.sale.mapper;

import com.qzp.bid.domain.deal.sale.dto.BidRes;
import com.qzp.bid.domain.deal.sale.entity.Bid;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BidMapper {

    @Mapping(source = "bidder.nickname", target = "bidder")
    BidRes BidToBidRes(Bid bid);
}
