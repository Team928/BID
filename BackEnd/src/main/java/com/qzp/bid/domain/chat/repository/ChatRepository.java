package com.qzp.bid.domain.chat.repository;


import com.qzp.bid.domain.chat.entity.Chat;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ChatRepository extends MongoRepository<Chat, Long> {


    int countAllByDealIdAndReadIsFalse(long roomId);

    List<Chat> findAllByDealIdAndReadIsFalse(long roomId);

    List<Chat> findAllByDealIdOrderByCreateTime(long roomId);


    void deleteAllByDealId(long roomId);
}
