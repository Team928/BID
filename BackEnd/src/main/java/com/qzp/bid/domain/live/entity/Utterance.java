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

    private int start_at;
    private int duration;
    private String msg;
    private int spk;

    public static Utterance from(Map<String, String> text) {
        return new Utterance(
            Integer.parseInt(text.get("start_at")),
            Integer.parseInt(text.get("duration")),
            text.get("msg"),
            Integer.parseInt(text.get("spk"))
        );
    }
}
