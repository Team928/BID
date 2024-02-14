package com.qzp.bid.domain.live.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SummaryOption {

    private String language;
    private String model;
    private int tone;
    private int summaryCount;
}
