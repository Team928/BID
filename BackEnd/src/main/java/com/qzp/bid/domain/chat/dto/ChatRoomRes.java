package com.qzp.bid.domain.chat.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ChatRoomRes {

    private long id;
    private String roomName;
    private long dealId;
    private LocalDateTime updateTime;
    private String lastMessage;

}
