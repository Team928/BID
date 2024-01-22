package com.qzp.bid.domain.chat.entity;

import java.time.LocalDateTime;

public class Chat {

  private long id;
  private String sender;
  private long roomId;
  private LocalDateTime time;
  private String message;
  private ChatType type;
}
