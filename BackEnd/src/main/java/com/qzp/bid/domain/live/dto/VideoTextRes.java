package com.qzp.bid.domain.live.dto;

import com.qzp.bid.domain.live.entity.Utterance;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VideoTextRes {

    private long id;
    private long videoId;
    private List<Utterance> utterances;
    private String summary;
}
