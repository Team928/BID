package com.qzp.bid.domain.member.mapper;

import com.qzp.bid.domain.member.dto.OpponentMemberRes;
import com.qzp.bid.domain.member.dto.LoginTokenDto;
import com.qzp.bid.domain.member.dto.LoginTokenRes;
import com.qzp.bid.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    @Mapping(source = "member.id", target = "id")
    @Mapping(source = "member.nickname", target = "nickname")
    @Mapping(source = "member.area", target = "area")
    @Mapping(source = "loginTokenDto.accessToken", target = "accessToken")
    @Mapping(source = "loginTokenDto.refreshToken", target = "refreshToken")
    LoginTokenRes toLoginTokenRes(Member member, LoginTokenDto loginTokenDto);

    @Mapping(source = "nickname", target = "opponentNick")
    OpponentMemberRes toOpponentMemberRes(Member member);

}
