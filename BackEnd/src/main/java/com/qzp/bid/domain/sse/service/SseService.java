package com.qzp.bid.domain.sse.service;

import com.qzp.bid.domain.sse.dto.SseDto;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseService {

    public SseEmitter subscribe(Long userId);

    public void send(SseDto event);
}
