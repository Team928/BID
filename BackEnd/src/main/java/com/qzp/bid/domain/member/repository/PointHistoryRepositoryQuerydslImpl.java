package com.qzp.bid.domain.member.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.qzp.bid.domain.member.dto.PointHistoryListPage;
import com.qzp.bid.domain.member.dto.PointHistorySimpleRes;
import com.qzp.bid.domain.member.entity.QPointHistory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;

@RequiredArgsConstructor
public class PointHistoryRepositoryQuerydslImpl implements PointHistoryRepositoryQuerydsl{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public PointHistoryListPage getPointHistoryListPageByMemberId(long memberId,
        Pageable pageable) {
        QPointHistory pointHistory = QPointHistory.pointHistory;

        List<PointHistorySimpleRes> pointHistorySimpleResList = jpaQueryFactory.select(Projections.fields(
            PointHistorySimpleRes.class,
            pointHistory.time,
            pointHistory.amount,
            pointHistory.status
        ))
            .from(pointHistory)
            .where(pointHistory.member.id.eq(memberId))
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize() + 1)
            .orderBy(pointHistory.time.desc())
            .fetch();

        boolean hasNext = false;
        if (pointHistorySimpleResList.size() > pageable.getPageSize()) {
            pointHistorySimpleResList.remove(pageable.getPageSize());
            hasNext = true;
        }

        return new PointHistoryListPage(pointHistorySimpleResList, pageable.getPageNumber(),
            pageable.getPageSize(), !hasNext);
}
}
