package com.qzp.bid.domain.sse.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SseType {
    TEST_MSG("test", "테스트 메시지"),
    SUCCESS_CONNECT_SSE("connect", "SSE 연결에 성공하였습니다."),
    START_AUCTION("auction", "관심 경매가 시작되었습니다."),
    START_AUCTION_BEFORE("auction", "관심 경매가 곧 시작 예정입니다."),
    SUCCESS_BID("auction", "낙찰되었습니다."),
    CANCEL_BID("auction", "상위 입찰이 발생했습니다.");

    private final String event;
    private final String message;
}
