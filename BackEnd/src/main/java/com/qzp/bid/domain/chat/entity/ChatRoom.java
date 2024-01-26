package com.qzp.bid.domain.chat.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ChatRoom {

    @Id
    @GeneratedValue
    private long id;
    private String roomName;
    private long dealId;
    private String hostId;
    private String guestId;
    private LocalDateTime time;

    public ChatRoom create(Long roomId, String roomName, String hostId, String guestId) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.id = roomId;
        chatRoom.roomName = roomName;
        chatRoom.hostId = hostId;
        chatRoom.guestId = guestId;
        chatRoom.time = LocalDateTime.now();
        return chatRoom;
    }

}
