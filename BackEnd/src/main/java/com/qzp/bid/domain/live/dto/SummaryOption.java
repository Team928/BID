package com.qzp.bid.domain.live.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SummaryOption {

    private String language;
    private String model;
    private int tone;
    private int summaryCount;
}
