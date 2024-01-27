package com.qzp.bid.domain.chat.entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalDateTime;
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

    private long id;
    private String sender;
    private long roomId;
    private LocalDateTime time;
    private String message;
    @Enumerated(EnumType.STRING)
    private ChatType type;
}
