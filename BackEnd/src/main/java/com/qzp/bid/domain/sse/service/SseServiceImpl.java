package com.qzp.bid.domain.sse.service;

import static com.qzp.bid.domain.sse.dto.SseType.SUCCESS_CONNECT_SSE;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qzp.bid.domain.sse.dto.SseDto;
import com.qzp.bid.domain.sse.repository.SseRepository;
import com.qzp.bid.global.result.error.ErrorCode;
import com.qzp.bid.global.result.error.exception.BusinessException;
import java.io.IOException;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@Slf4j
@RequiredArgsConstructor
public class SseServiceImpl implements SseService {

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private final RedisOperations<String, SseDto> eventRedisOperations;
    private final RedisMessageListenerContainer redisMessageListenerContainer;
    private final SseRepository sseRepository;
    private final ObjectMapper objectMapper;

    public SseEmitter subscribe(Long memberId) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        sseRepository.save(memberId, emitter);
        SseDto sseDto = SseDto.of(memberId, null, SUCCESS_CONNECT_SSE, LocalDateTime.now());
        sendToClient(sseDto);

        // MessageListener 익명함수 사용해서 onMessage 구현, Redis에서 새로운 알림이 발생하면 자동적으로 onMessage가 호출
        // 즉 알림을 serialize하고 해당 Client에게 알림을 전송한다.
        final MessageListener messageListener = (message, pattern) -> {
            final SseDto dto;
            try {
                dto = objectMapper.readValue(message.getBody(), SseDto.class);
            } catch (IOException e) {
                throw new BusinessException(ErrorCode.INPUT_VALUE_INVALID);
            }
            sendToClient(dto);
        };
        // redisMeesageListenerContainer에 새로운 MessageListener를 추가함
        redisMessageListenerContainer.addMessageListener(messageListener,
            ChannelTopic.of(getTopicName(sseDto.getMemberId())));
        // emitter의 상태를 체크함, 완료되었는지 타임아웃이 났는지
        checkEmitterStatus(emitter, memberId, messageListener);
        return emitter;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener
    //실질적으로 알림을 저장하고 redis 채널에 메시지를 publish하는 역할
    public void send(SseDto sseDto) {
        eventRedisOperations.convertAndSend(getTopicName(sseDto.getMemberId()), sseDto);
    }

    //종료 상태
    private void checkEmitterStatus(SseEmitter emitter, Long memberId,
        MessageListener messageListener) {
        emitter.onCompletion(() -> {
            log.info("타임아웃");
            sseRepository.deleteById(memberId);
            redisMessageListenerContainer.removeMessageListener(messageListener);
        });
        emitter.onTimeout(() -> {
            log.info("타임아웃");
            sseRepository.deleteById(memberId);
            redisMessageListenerContainer.removeMessageListener(messageListener);
        });
    }

    private void sendToClient(SseDto data) {
        SseEmitter emitter = sseRepository.get(data.getMemberId());
        if (emitter != null) {
            try {
                emitter.send(
                    SseEmitter.event()
                        .id(String.valueOf(data.getMemberId()))
                        .name(data.getEvent())
                        .data(data));
            } catch (IOException exception) {
                sseRepository.deleteById(data.getMemberId());
                emitter.completeWithError(exception);
            }
        }
    }

    private String getTopicName(final Long memberId) {
        return "topics:" + memberId;
    }
}