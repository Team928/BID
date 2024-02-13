package com.qzp.bid.domain.member.dto;

import com.qzp.bid.domain.member.entity.PointStatus;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointHistorySimpleRes {
    private LocalDateTime time;
    private int amount;
    private PointStatus status;

}
