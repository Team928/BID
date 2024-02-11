package com.qzp.bid.domain.chat.controller;

import com.qzp.bid.domain.chat.dto.ChatList;
import com.qzp.bid.domain.chat.dto.ChatRoomList;
import com.qzp.bid.domain.chat.entity.Chat;
import com.qzp.bid.domain.chat.service.ChatService;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
@Tag(name = "ChatController", description = "채팅 api")
public class ChatController {


    private final ChatService chatService;

    @ResponseBody
    @MessageMapping("/message/{dealId}")
    public void sendMessage(@DestinationVariable("dealId") long dealId, @Payload Chat chat) {
        chatService.sendChat(chat, dealId);
    }

    @ResponseBody
    @MessageMapping("/message/lives/{dealId}")
    public void sendLiveMessage(@DestinationVariable("dealId") long dealId, @Payload Chat chat) {
        chatService.sendLiveChat(chat, dealId);
    }


    @GetMapping("/rooms")
    public ResponseEntity<ResultResponse> findChatRooms(
        @RequestParam(name = "userId") Long userId) {
        List<ChatRoomList> chatRooms = chatService.findChatRooms(userId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.GET_CHATROOMS_SUCCESS, chatRooms));
    }

    @GetMapping("/rooms/{dealId}")
    public ResponseEntity<ResultResponse> findChats(@PathVariable(name = "dealId") Long dealId) {
        ChatList chats = chatService.findChats(dealId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.GET_CHATS_SUCCESS, chats));
    }

    @DeleteMapping("/rooms/{dealId}")
    public ResponseEntity<ResultResponse> exitChatRooms(
        @PathVariable(name = "dealId") Long dealId) {
        chatService.exitChatRooms(dealId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.EXIT_CHATROOM_SUCCESS));
    }

    //거래 확정 버튼 누르기
    @GetMapping("/confirmed/{dealId}")
    public ResponseEntity<ResultResponse> dealConfirmed(
        @PathVariable(name = "dealId") Long dealId) {
        chatService.dealConfirmed(dealId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.CONFIRMED_DEAL_SUCCESS));
    }
}
