package com.qzp.bid.domain.member.mapper;

import com.qzp.bid.domain.member.dto.MemberProfileRes;
import com.qzp.bid.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    MemberProfileRes toMemberProfileRes(Member member);

}
