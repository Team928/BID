package com.qzp.bid.domain.chat.service;

import com.qzp.bid.domain.chat.dto.ChatRes;
import com.qzp.bid.domain.chat.dto.ChatRoomList;
import com.qzp.bid.domain.chat.entity.Chat;
import java.util.List;

public interface ChatService {

    public void createRoom(long dealId);

    public void sendChat(Chat chat, long roomId);

    public List<ChatRoomList> findChatRooms(Long userId);

    public List<ChatRes> findChats(long roomId);

    public void exitChatRooms(long chatRoomId);

    public void dealConfirmed(long chatRoomId);
}
