package com.qzp.bid.domain.live.service;

import com.qzp.bid.domain.deal.entity.Deal;
import com.qzp.bid.domain.deal.entity.DealStatus;
import com.qzp.bid.domain.deal.purchase.entity.Purchase;
import com.qzp.bid.domain.deal.purchase.repository.PurchaseRepository;
import com.qzp.bid.domain.deal.repository.DealRepository;
import com.qzp.bid.domain.deal.sale.entity.Sale;
import com.qzp.bid.domain.deal.sale.repository.SaleRepository;
import com.qzp.bid.domain.live.dto.LiveRoomRes;
import com.qzp.bid.global.result.error.ErrorCode;
import com.qzp.bid.global.result.error.exception.BusinessException;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.RecordingMode;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import jakarta.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LiveServiceImpl implements LiveService {

    private OpenVidu openVidu;

    @Value("${openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${openvidu.secret}")
    private String OPENVIDU_SECRET;

    @PostConstruct
    public void init() {
        this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }


    private final RedisTemplate redisTemplate;
    private final DealRepository<Deal> dealRepository;
    private final SaleRepository saleRepository;
    private final PurchaseRepository purchaseRepository;

    @Override
    public LiveRoomRes JoinLiveRoom(Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {

        long userId = Long.parseLong((String)params.get("userId"));
        long dealId = Long.parseLong((String)params.get("dealId"));

        Deal deal = dealRepository.findById(dealId)
            .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));

        String sessionId = String.valueOf(redisTemplate.opsForHash().get("OpenVidu_SessionId",dealId));

        openVidu.fetch();
        Session session = null;
        for (Session s : openVidu.getActiveSessions()) {
            if (sessionId != null && s.getSessionId().equals(sessionId)) {
                session = s;
                break;
            }
        }

        Connection connection = null;
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
            .type(ConnectionType.WEBRTC)
            .role(OpenViduRole.PUBLISHER)
            .data(deal.toString())
            .build();

        if (session != null){ // 세션 존재

            connection = session.createConnection(connectionProperties);

            //  REDIS  <DealId : <UserId : ConnectionId>> 넣기
            HashMap<String, String> changehashMap = (HashMap<String, String>) redisTemplate.opsForHash().get("OpenVidu_ConnectionId", dealId);
            changehashMap.put("USERID", connection.getConnectionId());
            redisTemplate.opsForHash().put("OpenVidu_ConnectionId", dealId, changehashMap);

        }
        else { // 세션 없음 -> 새로 만들기

            // 라이브로 상태 바꾸기
            if(deal.getClass().getSimpleName().equals("Sale")){
                Sale sale = saleRepository.findById(dealId).orElseThrow(() -> new BusinessException(ErrorCode.SALE_ID_NOT_EXIST));
                sale.setStatus(DealStatus.LIVE);
                saleRepository.save(sale);
            }else{
                Purchase purchase = purchaseRepository.findById(dealId).orElseThrow(() -> new BusinessException(ErrorCode.GET_PURCHASE_FAIL));
                purchase.setStatus(DealStatus.LIVE);
                purchaseRepository.save(purchase);
            }

            SessionProperties sessionProperties = new SessionProperties.Builder()
                .customSessionId("LIVECHATROOMID"+dealId)
                .recordingMode(RecordingMode.MANUAL)
                .build();

            session = openVidu.createSession(sessionProperties);

            connection = session.createConnection(connectionProperties);

            // Redis  <DealId : SessionId> 넣기
            redisTemplate.opsForHash().put("OpenVidu_SessionId", dealId, session.getSessionId());

            // REDIS  <DealId : <UserId : ConnectionId>> 넣기
            HashMap<Long, String> redisHashValue = new HashMap<>();
            redisHashValue.put(userId, connection.getConnectionId());
            redisTemplate.opsForHash().put("OpenVidu_ConnectionId", dealId, redisHashValue);
        }

        // 응답에 필요한 정보 구성
        LiveRoomRes liveRoom = LiveRoomRes.builder()
            .roomNum(dealId)
            .roomName(deal.getTitle())
            .token(connection.getToken())
            .build();

        return liveRoom;
    }

}
