package com.qzp.bid.domain.deal.purchase.mapper;

import com.qzp.bid.domain.deal.purchase.dto.ApplyFormReq;
import com.qzp.bid.domain.deal.purchase.dto.ApplyFormRes;
import com.qzp.bid.domain.deal.purchase.entity.ApplyForm;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ApplyFormMapper {

    ApplyForm applyFormToApplyFormReq(ApplyFormReq applyFormReq);

    @Mapping(source = "seller.nickname", target = "sellerNickname")
    ApplyFormRes applyFormToApplyRes(ApplyForm applyForm);
}
