package com.qzp.bid.global.config;


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

    private final RedisTemplate redisTemplate;

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
                        redisTemplate.opsForValue().set(accessor.getSessionId(), accessor.getDestination());

                        if(redisTemplate.opsForHash().get("SubDestination", accessor.getDestination()) == null){
                            redisTemplate.opsForHash().put("SubDestination", accessor.getDestination(), 1);
                        }else{
                            redisTemplate.opsForHash().put("SubDestination", accessor.getDestination(),
                                (int)redisTemplate.opsForHash().get("SubDestination", accessor.getDestination()) + 1);
                        }
                        break;

                    case DISCONNECT:

                        String subscribe = String.valueOf(redisTemplate.opsForValue().get(accessor.getSessionId())).trim();
                        redisTemplate.delete(accessor.getSessionId());

                        if(redisTemplate.opsForHash().get( "SubDestination", subscribe) != null){
                            int subScriberCount = (int)redisTemplate.opsForHash().get( "SubDestination", subscribe);

                            if (subScriberCount == 1){
                                redisTemplate.opsForHash().delete( "SubDestination", subscribe);
                            }else{
                                redisTemplate.opsForHash().put("SubDestination", subscribe, subScriberCount - 1);
                            }
                        }
                        break;
                }

                return message;
            }
        });
    }


}