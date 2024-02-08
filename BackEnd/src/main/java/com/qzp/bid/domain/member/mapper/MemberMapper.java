package com.qzp.bid.domain.member.mapper;

import com.qzp.bid.domain.member.dto.MemberProfileRes;
import com.qzp.bid.domain.member.dto.OpponentMemberRes;
import com.qzp.bid.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    @Mapping(source = "nickname", target = "opponentNick")
    OpponentMemberRes toOpponentMemberRes(Member member);

    MemberProfileRes toMemberProfileRes(Member member);

}
