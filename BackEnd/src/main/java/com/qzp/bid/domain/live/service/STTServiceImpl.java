package com.qzp.bid.domain.live.service;

import com.qzp.bid.domain.live.entity.Utterance;
import com.qzp.bid.domain.live.entity.Video;
import com.qzp.bid.domain.live.entity.VideoText;
import com.qzp.bid.domain.live.repository.VideoRepository;
import com.qzp.bid.domain.live.repository.VideoTextRepository;
import java.io.File;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class STTServiceImpl implements STTService {

    private final VideoTextRepository videoTextRepository;
    private final VideoRepository videoRepository;
    @Value("${vito.client_id}")
    private String client_id;
    @Value("${vito.client_secret}")
    private String client_secret;

    public String getAccessToken() {
        WebClient webClient = WebClient.builder()
            .baseUrl("https://openapi.vito.ai")
            .build();

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("client_id", client_id);
        formData.add("client_secret", client_secret);

        Map<String, String> response = webClient
            .post()
            .uri("/v1/authenticate")
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .body(BodyInserters.fromFormData(formData))
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {
            })
            .block();

        return response.get("access_token");
    }


    @Override
    public void transcribeFile(long videoId) {
        String transcribeId = null;
        String accessToken = null;

        accessToken = getAccessToken();
        WebClient webClient = WebClient.builder()
            .baseUrl("https://openapi.vito.ai/v1")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, String.valueOf(MediaType.MULTIPART_FORM_DATA))
            .defaultHeader(HttpHeaders.AUTHORIZATION, "bearer " + accessToken)
            .build();

        Video video = videoRepository.findById(videoId).orElseThrow();

        File file = new File(video.getPath());

        MultipartBodyBuilder multipartBodyBuilder = new MultipartBodyBuilder();
        multipartBodyBuilder.part("file", new FileSystemResource(file));
        multipartBodyBuilder.part("config", "{}");

        // POST 요청 보내기
        Map<String, String> response = null;
        try {
            response = webClient.post()
                .uri("/transcribe")
                .body(BodyInserters.fromMultipartData(multipartBodyBuilder.build()))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {
                })
                .block();
        } catch (WebClientResponseException e) {
            log.error(String.valueOf(e));
        }

        try {
            if (response.get("code") != null && response.get("code").equals("H0002")) {
                log.info("accessToken 만료로 재발급 받습니다");
                accessToken = getAccessToken();
                response = webClient.post()
                    .uri("/transcribe")
                    .body(BodyInserters.fromMultipartData(multipartBodyBuilder.build()))
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {
                    })
                    .block();
            }
        } catch (RuntimeException e) {
            log.info("code 확인 불가 오류 catch");
            log.info(e.toString());
        }
//        log.info("transcribe 요청 id : " + jsonObject.getString("id"));

        transcribeId = response.get("id");

        Map<String, Object> stringObjectMap = null;
        try {
            stringObjectMap = startPolling(accessToken, transcribeId);
        } catch (InterruptedException e) {
            log.info(e.toString());
        }
        List<Map<String, String>> utterances = (List<Map<String, String>>) stringObjectMap.get(
            "utterances");
        VideoText videoText = new VideoText();
        videoText.setVideo(video);

        List<Utterance> texts = videoText.getUtterances();
        for (Map<String, String> utterance : utterances) {
            Utterance text = Utterance.from(utterance);
            texts.add(text);
        }
        videoTextRepository.save(videoText);
    }


    // 5초마다 실행 (주기는 필요에 따라 조절)
    public Map<String, Object> startPolling(String accessToken, String transcribeId)
        throws InterruptedException {
        boolean stopPolling = false;
        Map<String, Object> response = null;
        Thread.sleep(5000);
        while (!stopPolling) {
            WebClient webClient = WebClient.builder()
                .baseUrl("https://openapi.vito.ai/v1")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "bearer " + accessToken)
                .build();

            String uri = "/transcribe/" + transcribeId;
            response = webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .block();

            // status 확인하여 폴링 중단 여부 결정
            if (response.get("status").equals("completed") || response.get("status")
                .equals("failed")) {
                stopPolling = true;
            }

            try {
                Thread.sleep(5000); // 폴링 주기 (5초)를 설정
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        return (Map<String, Object>) response.get("results");
    }
}
