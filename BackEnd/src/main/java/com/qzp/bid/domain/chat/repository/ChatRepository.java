package com.qzp.bid.domain.chat.repository;

import com.qzp.bid.domain.chat.dto.ChatRes;
import com.qzp.bid.domain.chat.entity.Chat;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ChatRepository extends MongoRepository<Chat, Long> {

    ChatRes findFirstByRoomIdOrderByCreateTimeDesc(long roomId);

    @Query("{ 'roomId' : ?0, 'read': false }")
    List<Chat> findUnReadChats(long roomId);

    int countAllByRoomIdAndReadIsFalse(long roomId);

    List<ChatRes> findAllByRoomIdOrderByCreateTime(long roomId);


     void deleteAllByRoomId(long roomId);
}
