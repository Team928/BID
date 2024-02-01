package com.qzp.bid.domain.chat.dto;

import com.qzp.bid.domain.chat.entity.ChatType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRes {

    private String sender;
    private long senderId;
    private long roomId;
    private String createTime;
    private String message;
    @Enumerated(EnumType.STRING)
    private ChatType type;
    private boolean read;
}
