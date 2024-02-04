package com.qzp.bid.domain.chat.dto;


import com.qzp.bid.domain.deal.dto.DealResWithEndPrice;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ChatList {

    List<ChatRes> chatResList;
    DealResWithEndPrice dealResWithEndPrice;
    boolean exitRoomPossible;
}
