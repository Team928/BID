package com.qzp.bid.domain.sse.controller;

import static com.qzp.bid.domain.sse.dto.SseType.TEST_MSG;

import com.qzp.bid.domain.sse.dto.SseDto;
import com.qzp.bid.domain.sse.service.SseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/sse")
@RequiredArgsConstructor
@Tag(name = "SSEController", description = "SSE 연결 관련")
public class SseController {

    private final SseService sseService;

    @Operation(summary = "SSE 연결", description = "스웨거에서 지원하지 않는듯.")
    @GetMapping(value = "/subscribe/{memberId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> subscribe(@PathVariable Long memberId,
        HttpServletResponse response) {
        SseEmitter emitter = sseService.subscribe(memberId);
        response.setHeader("X-Accel-Buffering", "no");
        return ResponseEntity.ok(emitter);
    }

    @Operation(summary = "SSE로 테스트 메시지 전달")
    @PostMapping("/send/{memberId}")
    public ResponseEntity<Void> sendData(@PathVariable Long memberId) {
        SseDto sseDto = SseDto.of(memberId, null, null, TEST_MSG, LocalDateTime.now());
        sseService.send(sseDto);
        return ResponseEntity.ok().build();
    }
}
