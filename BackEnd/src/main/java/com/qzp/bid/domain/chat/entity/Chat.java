package com.qzp.bid.domain.chat.entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "chat")
public class Chat {

    private String sender;
    private long senderId;
    private long roomId;
    private String createTime;
    private String message;
    @Enumerated(EnumType.STRING)
    private ChatType type;
}
