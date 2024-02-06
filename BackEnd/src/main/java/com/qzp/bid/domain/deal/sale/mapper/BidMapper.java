package com.qzp.bid.domain.deal.sale.mapper;

import com.qzp.bid.domain.deal.sale.dto.BidRes;
import com.qzp.bid.domain.deal.sale.entity.Bid;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Slice;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BidMapper {

    @Mapping(source = "bidder.nickname", target = "bidder")
    BidRes BidToBidRes(Bid bid);

    default List<BidRes> toBidResList(Slice<Bid> bids) {
        return bids.stream()
            .map(this::BidToBidRes)
            .collect(Collectors.toList());
    }
}
