package com.qzp.bid.domain.deal.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageSimpleDto {

    private String imagePath;

    @QueryProjection
    public ImageSimpleDto(String imagePath) {
        this.imagePath = imagePath;
    }
}
