package com.qzp.bid.domain.chat.service;

import com.qzp.bid.domain.chat.entity.Chat;

public interface ChatService {

    public void createRoom(long dealId);

    public void sendChat(Chat chat);

}
