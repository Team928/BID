package com.qzp.bid.domain.member.dto;

import com.qzp.bid.domain.member.entity.ReviewRole;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewSimpleRes {

    private long id;
    private String reviewerNickname;
    private String tergetNickname;
    private String content;
    private int score;
    private LocalDateTime createTime;
    private ReviewRole role;

}
