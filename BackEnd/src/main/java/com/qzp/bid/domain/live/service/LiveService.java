package com.qzp.bid.domain.live.service;

import com.qzp.bid.domain.live.dto.LiveRecordingRes;
import com.qzp.bid.domain.live.dto.LiveRoomReq;
import com.qzp.bid.domain.live.dto.LiveRoomRes;
import com.qzp.bid.domain.live.entity.Video;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Recording;
import java.util.List;

public interface LiveService {

    LiveRoomRes JoinLiveRoom(LiveRoomReq liveRoomReq)
        throws OpenViduJavaClientException, OpenViduHttpException;

    Recording StartRecording(LiveRoomReq liveRoomReq)
        throws OpenViduJavaClientException, OpenViduHttpException;

    Recording EndRecording(LiveRoomReq liveRoomReq)
        throws OpenViduJavaClientException, OpenViduHttpException;

    void CheckRecording(LiveRecordingRes liveRecordingRes);

    void EndLive(long dealId);

    List<Video> GetLiveRecord(long dealId);
}
