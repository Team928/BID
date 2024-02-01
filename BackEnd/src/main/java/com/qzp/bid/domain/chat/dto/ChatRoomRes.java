package com.qzp.bid.domain.chat.dto;

import com.qzp.bid.domain.chat.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChatRoomRes {

    private ChatRoom chatRoom;
    private int unReadCount = 0;

}
