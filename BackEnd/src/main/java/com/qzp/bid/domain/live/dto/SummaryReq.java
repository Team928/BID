package com.qzp.bid.domain.live.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SummaryReq {

    private SummaryDocument document;
    private SummaryOption option;

    public static SummaryReq of(String text) {
        SummaryDocument summaryDocument = SummaryDocument.builder().content(text).build();
        SummaryOption summaryOption = SummaryOption.builder().language("ko").tone(3).build();
        return new SummaryReq(summaryDocument, summaryOption);
    }
}
