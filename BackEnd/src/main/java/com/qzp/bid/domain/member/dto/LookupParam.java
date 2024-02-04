package com.qzp.bid.domain.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "조회 조건 파라미터")
public class LookupParam {

    @Schema(description = "페이지 번호", example = "0", defaultValue = "0", requiredMode = RequiredMode.REQUIRED)
    private int page;
    @Schema(description = "한 페이지 당 글 갯수", example = "10", defaultValue = "10", requiredMode = RequiredMode.REQUIRED)
    private int size;
    @Schema(description = "경매인지 역경매인지", example = "purchase", defaultValue = "sale", requiredMode = RequiredMode.REQUIRED)
    private String type;
}
