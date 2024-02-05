package com.qzp.bid.domain.chat.dto;

import com.qzp.bid.domain.chat.entity.ChatType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatLive {

    private String sender;
    private long senderId;
    private long roomId;
    private String message;
    private String createTime;
    @Enumerated(EnumType.STRING)
    private ChatType type;




}
