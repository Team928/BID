package com.qzp.bid.domain.chat.mapper;

import com.qzp.bid.domain.chat.dto.ChatLive;
import com.qzp.bid.domain.chat.dto.ChatRes;
import com.qzp.bid.domain.chat.dto.ChatRoomRes;
import com.qzp.bid.domain.chat.entity.Chat;
import com.qzp.bid.domain.chat.entity.ChatRoom;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ChatRoomMapper {

    ChatRes toChatRes(Chat chat);

    ChatLive toChatLive(Chat chat);

    ChatRoomRes toChatRoomRes(ChatRoom chatRoom);

}
