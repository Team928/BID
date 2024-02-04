package com.qzp.bid.domain.sse.service;

import static com.qzp.bid.domain.sse.dto.SseType.SUCCESS_CONNECT_SSE;

import com.qzp.bid.domain.sse.dto.SseDto;
import com.qzp.bid.domain.sse.repository.SseRepository;
import java.io.IOException;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@Slf4j
@RequiredArgsConstructor
public class SseServiceImpl implements SseService {

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private final SseRepository sseRepository;

    public SseEmitter subscribe(Long userId) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        sseRepository.save(userId, emitter);

        // Emitter가 완료될 때 Emitter를 삭제한다.
        emitter.onCompletion(() -> sseRepository.deleteById(userId));
        // Emitter가 타임아웃 되었을 때 Emitter를 삭제한다.
        emitter.onTimeout(() -> sseRepository.deleteById(userId));
        SseDto sseDto = SseDto.of(userId, null, SUCCESS_CONNECT_SSE, LocalDateTime.now());
        sendToClient(sseDto);
        return emitter;
    }

    public void send(SseDto event) {
        sendToClient(event);
    }

    private void sendToClient(SseDto data) {
        SseEmitter emitter = sseRepository.get(data.getUserId());
        if (emitter != null) {
            try {
                emitter.send(
                    SseEmitter.event().id(String.valueOf(data.getUserId())).name(data.getEvent())
                        .data(data));
            } catch (IOException exception) {
                sseRepository.deleteById(data.getUserId());
                emitter.completeWithError(exception);
            }
        }
    }
}