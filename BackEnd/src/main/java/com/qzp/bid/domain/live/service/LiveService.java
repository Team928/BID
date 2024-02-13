package com.qzp.bid.domain.live.service;

import com.qzp.bid.domain.live.dto.LiveRecordingRes;
import com.qzp.bid.domain.live.dto.LiveRoomReq;
import com.qzp.bid.domain.live.dto.LiveRoomRes;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Recording;

public interface LiveService {

    public LiveRoomRes JoinLiveRoom(LiveRoomReq liveRoomReq)
        throws OpenViduJavaClientException, OpenViduHttpException;

    public Recording StartRecording(LiveRoomReq liveRoomReq)
        throws OpenViduJavaClientException, OpenViduHttpException;

    public Recording EndRecording(LiveRoomReq liveRoomReq)
        throws OpenViduJavaClientException, OpenViduHttpException;

    public void CheckRecording(LiveRecordingRes liveRecordingRes);

    public void EndLive(long dealId);
}
