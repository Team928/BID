package com.qzp.bid.domain.live.service;

import com.qzp.bid.domain.live.dto.SummaryReq;
import com.qzp.bid.domain.live.entity.Utterance;
import com.qzp.bid.domain.live.entity.VideoText;
import com.qzp.bid.domain.live.repository.VideoTextRepository;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SummaryServiceImpl implements SummaryService {

    private final VideoTextRepository videoTextRepository;
    @Value("${clova.client_id}")
    private String client_id;
    @Value("${clova.client_secret}")
    private String client_secret;

    @Override
    public void getSummary(long videoId) {
        VideoText videoText = videoTextRepository.findById(videoId).orElseThrow();
        String text = videoText.getUtterances().stream().map(Utterance::getMsg)
            .collect(Collectors.joining());
        SummaryReq summaryReq = SummaryReq.of(text);
        WebClient webClient = WebClient.builder()
            .baseUrl("https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize")
            .defaultHeaders(httpHeaders -> {
                httpHeaders.add("X-NCP-APIGW-API-KEY-ID", client_id);
                httpHeaders.add("X-NCP-APIGW-API-KEY", client_secret);
                httpHeaders.add("Content-Type", "application/json");
            })
            .build();

        Map<String, String> response = webClient.post()
            .contentType(MediaType.APPLICATION_JSON)
            .body(BodyInserters.fromValue(summaryReq))
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {
            })
            .block();
        String summary = response.get("summary");
        videoText.setSummary(summary);
    }
}
