package com.qzp.bid.domain.chat.mapper;

import com.qzp.bid.domain.chat.dto.ChatRoomRes;
import com.qzp.bid.domain.chat.entity.ChatRoom;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ChatRoomMapper {

    ChatRoomRes toChatRoomRes(ChatRoom chatRoom);
}
