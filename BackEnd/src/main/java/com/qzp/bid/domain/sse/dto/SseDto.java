package com.qzp.bid.domain.sse.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SseDto {

    Long memberId;
    Long dealId;
    String dealType;
    String event;
    String type;
    String message;
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    LocalDateTime time;

    public static SseDto of(Long memberId, Long dealId, String dealType, SseType sseType,
        LocalDateTime time) {
        return new SseDto(memberId, dealId, dealType, sseType.getEvent(), sseType.name(),
            sseType.getMessage(),
            time);
    }
}
