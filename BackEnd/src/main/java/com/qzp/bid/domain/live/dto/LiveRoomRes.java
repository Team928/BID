package com.qzp.bid.domain.live.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LiveRoomRes {
    private long roomNum;
    private String roomName;
    private String token;

}
