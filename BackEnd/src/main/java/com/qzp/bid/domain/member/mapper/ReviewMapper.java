package com.qzp.bid.domain.member.mapper;

import com.qzp.bid.domain.member.dto.MemberReviewReq;
import com.qzp.bid.domain.member.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {

    @Mapping(source = "dealId", target = "dealId")
    @Mapping(source = "score", target = "score")
    @Mapping(source = "content", target = "content")
    Review toReview(MemberReviewReq memberReviewReq);

}
