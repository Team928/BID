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
import org.springframework.web.bind.annotation.RequestHeader;
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
    private final ChatRepository chatRepository;
    private final JwtProvider jwtProvider;


    @ResponseBody
    @MessageMapping("/message/{roomId}")
    public void sendMessage(@DestinationVariable("roomId") Long roomId, @Payload Chat chat) {
        chat.setRoomId(roomId);
        if (chat.getType().equals(ChatType.TALK)) {
            chatService.sendChat(chat);
        }
    }

    @GetMapping("/rooms")
    public ResponseEntity<ResultResponse> findChatRooms(@RequestParam(name = "userId") Long userId){
        List<ChatRoomRes> chatRooms = chatService.findChatRooms(userId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.GET_CHATROOMS_SUCCESS, chatRooms));
    }

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<ResultResponse> findChats(@RequestHeader("Authorization") String authorizationHeader, @PathVariable(name = "roomId") Long roomId){
        String userInfo = jwtProvider.parseTokenToUserInfo(authorizationHeader.substring(7));

        ChatRes chatRes = chatRepository.findFirstByRoomIdOrderByCreateTimeDesc(roomId);
        boolean read = chatRes.getSenderId() != Integer.parseInt(userInfo);

        List<ChatRes> chats = chatService.findChats(roomId, read, Long.valueOf(userInfo));
        return ResponseEntity.ok(ResultResponse.of(ResultCode.GET_CHATS_SUCCESS, chats));
    }

    @DeleteMapping("/rooms/{roomId}")
    public ResponseEntity<ResultResponse> exitChatRooms(@RequestHeader("Authorization") String authorizationHeader, @PathVariable(name = "roomId") Long roomId){
        String userInfo = jwtProvider.parseTokenToUserInfo(authorizationHeader.substring(7));
        chatService.exitChatRooms(Integer.parseInt(userInfo), roomId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.EXIT_CHATROOM_SUCCESS));
    }

}
