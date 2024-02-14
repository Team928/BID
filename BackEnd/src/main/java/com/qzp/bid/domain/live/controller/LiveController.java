package com.qzp.bid.domain.live.controller;

import com.qzp.bid.domain.chat.dto.LiveResultReq;
import com.qzp.bid.domain.chat.service.ChatService;
import com.qzp.bid.domain.live.dto.LiveRoomRes;
import com.qzp.bid.domain.live.dto.SummaryReq;
import com.qzp.bid.domain.live.service.LiveService;
import com.qzp.bid.domain.live.service.STTService;
import com.qzp.bid.domain.live.service.SummaryService;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/lives")
public class LiveController {

    private final LiveService liveService;
    private final ChatService chatService;
    private final STTService sttService;
    private final SummaryService summaryService;


    @GetMapping("/create/rooms") // 방만들기 & 방참가
    public ResponseEntity<ResultResponse> JoinLiveRoom(@RequestParam Map<String, Object> params)
        throws OpenViduJavaClientException, OpenViduHttpException {
        LiveRoomRes liveRoom = liveService.JoinLiveRoom(params);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.CREATE_LIVE_ROOM_SUCCESS, liveRoom));
    }

    @GetMapping("/purchase/results") // 역경매 판매자 선택하기 + 채팅방 개설
    public ResponseEntity<ResultResponse> ChoicePurchaseResult(LiveResultReq resultReq) {
        chatService.createRoom(resultReq);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.CHOICE_RESULT_SUCCESS));

    }

    @GetMapping("/results") //stt
    public ResponseEntity<ResultResponse> getSTT(long videoId) {
        sttService.transcribeFile(videoId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.CHOICE_RESULT_SUCCESS));
    }

    @PostMapping("/summary") //stt
    public ResponseEntity<ResultResponse> getSummary(@RequestBody SummaryReq summaryReq) {
        String summary = summaryService.getSummary(summaryReq);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.CHOICE_RESULT_SUCCESS, summary));
    }
}
