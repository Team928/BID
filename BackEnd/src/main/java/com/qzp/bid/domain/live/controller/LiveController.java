package com.qzp.bid.domain.live.controller;

import com.qzp.bid.domain.live.dto.LiveRoomRes;
import com.qzp.bid.domain.live.service.LiveService;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/lives")
public class LiveController {

    private final LiveService liveService;


    @GetMapping("/create/rooms") // 방만들기 & 방참가
    public ResponseEntity<ResultResponse> JoinLiveRoom(@RequestBody(required = false) Map<String, Object> params)
        throws OpenViduJavaClientException, OpenViduHttpException {
        LiveRoomRes liveRoom = liveService.JoinLiveRoom(params);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.CREATE_LIVE_ROOM_SUCCESS, liveRoom));
    }

}
