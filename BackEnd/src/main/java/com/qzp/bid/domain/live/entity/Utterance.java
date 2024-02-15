package com.qzp.bid.domain.live.entity;

import jakarta.persistence.Embeddable;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Utterance {

    private String start_at;
    private String duration;
    private String msg;
    private String spk;

    public static Utterance from(Map<String, Object> text) {
        return new Utterance(
            String.valueOf(text.get("start_at")),
            String.valueOf(text.get("duration")),
            String.valueOf(text.get("msg")),
            String.valueOf(text.get("spk"))
        );
    }
}
