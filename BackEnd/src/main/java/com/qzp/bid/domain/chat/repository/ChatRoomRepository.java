package com.qzp.bid.domain.chat.repository;

import com.qzp.bid.domain.chat.entity.ChatRoom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    List<ChatRoom> findAllByGuestIdOrHostIdOrderByCreateTimeDesc(
        Long guestId, Long hostId);
    
}


