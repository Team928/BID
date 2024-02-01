package com.qzp.bid.domain.chat.service;

import com.qzp.bid.domain.chat.dto.ChatRes;
import com.qzp.bid.domain.chat.dto.ChatRoomRes;
import com.qzp.bid.domain.chat.entity.Chat;
import com.qzp.bid.domain.chat.entity.ChatRoom;
import java.util.List;

public interface ChatService {

    public void createRoom(long dealId);

    public void sendChat(Chat chat);

    public List<ChatRoomRes> findChatRooms(Long userId);

    public List<ChatRes> findChats(long roomId,boolean read,long userId);

    public void exitChatRooms(long userId, long chatRoomId);
}
