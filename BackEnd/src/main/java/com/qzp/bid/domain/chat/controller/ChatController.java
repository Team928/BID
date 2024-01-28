package com.qzp.bid.domain.chat.controller;

import com.qzp.bid.domain.chat.entity.Chat;
import com.qzp.bid.domain.chat.entity.ChatType;
import com.qzp.bid.domain.chat.service.ChatService;
import com.qzp.bid.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatController {

    private final SimpMessageSendingOperations template;
    private final ChatService chatService;
    private final MemberRepository memberRepository;


    @ResponseBody
    @MessageMapping("/message/{roomId}")
    public void sendMessage(@DestinationVariable Long roomId, @Payload Chat chat) {
        chat.setRoomId(roomId);
        if (chat.getType().equals(ChatType.TALK)) {
            chatService.sendChat(chat);
        }
    }
}
