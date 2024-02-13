package com.qzp.bid.domain.live.controller;

import com.qzp.bid.domain.chat.dto.LiveResultReq;
import com.qzp.bid.domain.chat.service.ChatService;
import com.qzp.bid.domain.live.dto.LiveRecordingRes;
import com.qzp.bid.domain.live.dto.LiveRoomReq;
import com.qzp.bid.domain.live.dto.LiveRoomRes;
import com.qzp.bid.domain.live.service.LiveService;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Recording;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/lives")
public class LiveController {

    private final LiveService liveService;
    private final ChatService chatService;


    @GetMapping("/create/rooms") // 방만들기 & 방참가
    public ResponseEntity<ResultResponse> JoinLiveRoom(LiveRoomReq liveRoomReq)
        throws OpenViduJavaClientException, OpenViduHttpException {
        LiveRoomRes liveRoom = liveService.JoinLiveRoom(liveRoomReq);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.CREATE_LIVE_ROOM_SUCCESS, liveRoom));
    }

    @GetMapping("/purchase/results") // 역경매 판매자 선택하기 + 채팅방 개설
    public ResponseEntity<ResultResponse> ChoicePurchaseResult(LiveResultReq resultReq){
        chatService.createRoom(resultReq);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.CHOICE_RESULT_SUCCESS));

    }

    @GetMapping("/start/recording")
    public ResponseEntity<ResultResponse> StartRecording(LiveRoomReq liveRoomReq)
        throws OpenViduJavaClientException, OpenViduHttpException {
        Recording recording = liveService.StartRecording(liveRoomReq);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.RECORDING_SUCCESS, recording));
    }

    @GetMapping("/end/recording")
    public ResponseEntity<ResultResponse> EndRecording(LiveRoomReq liveRoomReq)
        throws OpenViduJavaClientException, OpenViduHttpException {
        Recording recording = liveService.EndRecording(liveRoomReq);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.RECORDING_END_SUCCESS, recording));
    }

    @GetMapping("/check/recording")
    public ResponseEntity<ResultResponse> CheckRecording(LiveRecordingRes liveRecordingRes){
        liveService.CheckRecording(liveRecordingRes);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.RECORDING_CHECK_SUCCESS));
    }
}
