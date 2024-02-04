package com.qzp.bid.domain.deal.sale.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.qzp.bid.domain.deal.dto.DealSimpleRes;
import com.qzp.bid.domain.deal.entity.DealStatus;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleSimpleRes {

    private DealSimpleRes dealSimpleRes;
    private int immediatePrice;
    private int startPrice;
    private LocalDateTime endTime;
    private int bid;
    private DealStatus status;
    @JsonProperty("isWished")
    private boolean isWished; // wish 여부를 나타내는 필드
}