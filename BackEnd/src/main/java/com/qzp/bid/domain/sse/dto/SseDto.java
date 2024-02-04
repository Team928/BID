package com.qzp.bid.domain.sse.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SseDto {

    Long userId;
    Long dealId;
    String event;
    String type;
    String message;
    LocalDateTime time;

    public static SseDto of(Long userId, Long dealId, SseType sseType, LocalDateTime time) {
        return new SseDto(userId, dealId, sseType.getEvent(), sseType.name(), sseType.getMessage(),
            time);
    }
}
