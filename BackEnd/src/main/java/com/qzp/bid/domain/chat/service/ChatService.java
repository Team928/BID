package com.qzp.bid.domain.chat.service;

import com.qzp.bid.domain.chat.dto.ChatList;
import com.qzp.bid.domain.chat.dto.ChatRoomList;
import com.qzp.bid.domain.chat.entity.Chat;
import java.util.List;

public interface ChatService {

    public void createRoom(long dealId);

    public void sendChat(Chat chat, long roomId);

    public void sendLiveChat(Chat chat, long roomId);

    public List<ChatRoomList> findChatRooms(Long userId);

    public ChatList findChats(long roomId);

    public void exitChatRooms(long chatRoomId);

    public void dealConfirmed(long chatRoomId);
}
