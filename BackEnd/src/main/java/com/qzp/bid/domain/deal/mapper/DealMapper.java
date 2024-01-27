package com.qzp.bid.domain.deal.mapper;

import com.qzp.bid.domain.deal.dto.DealRes;
import com.qzp.bid.domain.deal.sale.entity.Sale;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DealMapper {

    @Mapping(source = "writer", target = "writer", ignore = true)
    @Mapping(source = "images", target = "images", ignore = true)
    DealRes toDealRes(Sale sale);
}
