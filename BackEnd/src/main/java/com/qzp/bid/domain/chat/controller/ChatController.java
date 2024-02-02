package com.qzp.bid.domain.chat.controller;

import com.qzp.bid.domain.chat.dto.ChatRes;
import com.qzp.bid.domain.chat.dto.ChatRoomRes;
import com.qzp.bid.domain.chat.entity.Chat;
import com.qzp.bid.domain.chat.entity.ChatType;
import com.qzp.bid.domain.chat.repository.ChatRepository;
import com.qzp.bid.domain.chat.repository.ChatRoomRepository;
import com.qzp.bid.domain.chat.service.ChatService;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import com.qzp.bid.global.security.util.JwtProvider;
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
@RequiredArgsConstructor@Tag(name = "ChatController", description = "채팅 api")
public class ChatController {


    private final ChatService chatService;

    @ResponseBody
    @MessageMapping("/message/{roomId}")
    public void sendMessage(@DestinationVariable("roomId") long roomId, @Payload Chat chat) {
        chatService.sendChat(chat, roomId);
    }

    @GetMapping("/rooms")
    public ResponseEntity<ResultResponse> findChatRooms(@RequestParam(name = "userId") Long userId){
        List<ChatRoomRes> chatRooms = chatService.findChatRooms(userId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.GET_CHATROOMS_SUCCESS, chatRooms));
    }

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<ResultResponse> findChats(@PathVariable(name = "roomId") Long roomId){
        List<ChatRes> chats = chatService.findChats(roomId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.GET_CHATS_SUCCESS, chats));
    }

    @DeleteMapping("/rooms/{roomId}")
    public ResponseEntity<ResultResponse> exitChatRooms(@PathVariable(name = "roomId") Long roomId){
        chatService.exitChatRooms(roomId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.EXIT_CHATROOM_SUCCESS));
    }

    //거래 확정 버튼 누르기
    @GetMapping("/confirmed/{roomId}")
    public ResponseEntity<ResultResponse> dealConfirmed(@PathVariable(name = "roomId") Long roomId){
        chatService.dealConfirmed(roomId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.CONFIRMED_DEAL_SUCCESS));
    }
}
