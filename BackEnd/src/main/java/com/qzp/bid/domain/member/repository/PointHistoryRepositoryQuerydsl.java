package com.qzp.bid.domain.member.repository;

import com.qzp.bid.domain.member.dto.PointHistoryListPage;
import org.springframework.data.domain.Pageable;

public interface PointHistoryRepositoryQuerydsl {

    PointHistoryListPage getPointHistoryListPageByMemberId(long memberId, Pageable pageable);

}
