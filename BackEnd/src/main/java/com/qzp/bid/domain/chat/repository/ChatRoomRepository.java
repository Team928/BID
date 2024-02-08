package com.qzp.bid.domain.chat.repository;

import com.qzp.bid.domain.chat.entity.ChatRoom;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    List<ChatRoom> findAllByGuestIdOrHostIdOrderByCreateTimeDesc(
        Long guestId, Long hostId);
    Optional<ChatRoom> findChatRoomByDealId(long dealId);


}


