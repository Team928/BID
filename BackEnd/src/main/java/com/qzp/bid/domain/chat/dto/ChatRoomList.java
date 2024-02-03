package com.qzp.bid.domain.chat.dto;

import com.qzp.bid.domain.member.dto.OpponentMemberRes;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChatRoomList {

    private ChatRoomRes chatRoomRes;
    @Builder.Default
    private int unReadCount = 0;
    private boolean exitPossible;
    private OpponentMemberRes audienceMemberRes;

}
