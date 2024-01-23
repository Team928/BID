package com.qzp.bid.domain.chat.entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalDateTime;

public class Chat {

    private long id;
    private String sender;
    private long roomId;
    private LocalDateTime time;
    private String message;
    @Enumerated(EnumType.STRING)
    private ChatType type;
}
