package com.qzp.bid.domain.chat.repository;


import com.qzp.bid.domain.chat.entity.Chat;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ChatRepository extends MongoRepository<Chat, Long> {


    int countAllByRoomIdAndReadIsFalse(long roomId);

    List<Chat> findAllByRoomIdOrderByCreateTime(long roomId);


    void deleteAllByRoomId(long roomId);
}
