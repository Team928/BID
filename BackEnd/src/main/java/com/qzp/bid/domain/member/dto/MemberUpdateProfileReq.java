package com.qzp.bid.domain.member.dto;

import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberUpdateProfileReq {

    @ApiModelProperty(required = false)
    private String nickname;
    @ApiModelProperty(required = false)
    private List<String> area;

}
