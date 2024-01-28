package com.qzp.bid.domain.chat.repository;

import com.qzp.bid.domain.chat.entity.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatRepository extends MongoRepository<Chat, Long> {

}
