package com.qzp.bid.domain.live.service;

import com.qzp.bid.domain.live.dto.VideoTextRes;

public interface STTService {

    void transcribeFile(long videoId);

    VideoTextRes getVideoText(long videoId);
}
