package com.qzp.bid.domain.chat.service;

import com.qzp.bid.domain.chat.entity.Chat;
import com.qzp.bid.domain.chat.entity.ChatRoom;
import java.util.List;

public interface ChatService {

    public void createRoom(long dealId);

    public void sendChat(Chat chat);

    public List<ChatRoom> findChatRooms(Long userId);
}
