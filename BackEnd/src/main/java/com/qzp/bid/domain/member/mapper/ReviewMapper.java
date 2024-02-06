package com.qzp.bid.domain.member.mapper;

import com.qzp.bid.domain.member.dto.MemberReviewReq;
import com.qzp.bid.domain.member.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {

    Review toReview(MemberReviewReq memberReviewReq);
}
