package com.qzp.bid.domain.live.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SummaryDocument {

    private String title;
    private String content;
}
