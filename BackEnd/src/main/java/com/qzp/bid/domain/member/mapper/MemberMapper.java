package com.qzp.bid.domain.member.mapper;

import com.qzp.bid.domain.member.dto.MemberProfileRes;
import com.qzp.bid.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    @Mapping(source = "nickname", target = "nickname")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "member.point", target="point")
    @Mapping(source = "profileImage", target = "profileImage")
    @Mapping(source = "score", target = "score")
    MemberProfileRes toMemberProfileRes(Member member);

}
