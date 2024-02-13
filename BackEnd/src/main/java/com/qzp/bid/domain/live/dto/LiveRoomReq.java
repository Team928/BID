package com.qzp.bid.domain.live.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LiveRoomReq {

    long userId;
    long dealId;
}
