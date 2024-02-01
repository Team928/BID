package com.qzp.bid.global.config;


import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Slf4j
@Configuration
@EnableWebSocket // WebSocket 서버를 사용하도록 정의
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private final HashMap<String, Integer> sessionSubMap = new HashMap<>();
    private final RedisTemplate redisTemplate;
//    private final MessageHandler messageHandler;
//    private final SimpUserRegistry simpUserRegistry;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // "/sub"
        registry.enableSimpleBroker("/sub");
        // "/pub"
        registry.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
            .setAllowedOriginPatterns("*");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                    MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                switch(accessor.getCommand()){
                    case SUBSCRIBE:
//                        sessionSubMap.put(accessor.getSessionId(), accessor.getDestination());

                        if(redisTemplate.opsForValue().get(accessor.getSessionId()) == null){
                            redisTemplate.opsForValue().set(accessor.getSessionId(), accessor.getDestination(), 1);
                        }
                        sessionSubMap.put(accessor.getDestination(), (sessionSubMap.get(accessor.getDestination()) == null)?1:sessionSubMap.get(accessor.getDestination())+1);
                        //TEST
                        System.out.println(redisTemplate.opsForValue().get(accessor.getSessionId()));
                        System.out.println(sessionSubMap.get(accessor.getDestination()));

                        break;

                    case DISCONNECT:
                        String subscribe = String.valueOf(redisTemplate.opsForValue().get(accessor.getSessionId())).trim();
                        redisTemplate.delete(accessor.getSessionId());

                        if(sessionSubMap.get(subscribe) == 1){
                            sessionSubMap.remove(subscribe);
                        }else{
                            sessionSubMap.put(subscribe, sessionSubMap.get(subscribe) - 1);
                        }
                        System.out.println((sessionSubMap.get(subscribe) != null)?"null":"1");
                        break;
                }
                return message;
            }
        });
    }
    public Integer getSubCount(String roomId){
        return sessionSubMap.get("/sub/chats/room/" + roomId);
    }
}