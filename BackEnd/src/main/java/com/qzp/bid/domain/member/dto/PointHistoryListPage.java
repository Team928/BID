package com.qzp.bid.domain.member.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PointHistoryListPage {

    private List<PointHistorySimpleRes> pointHistorySimpleResList;
    private int pageNumber;
    private int pageSize;
    private boolean last; //다음 페이지 존재 여부

}
