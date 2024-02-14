package com.qzp.bid.domain.live.service;

import com.qzp.bid.domain.live.dto.LiveRoomRes;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import java.util.Map;

public interface LiveService {

    LiveRoomRes JoinLiveRoom(Map<String, Object> params)
        throws OpenViduJavaClientException, OpenViduHttpException;

}
