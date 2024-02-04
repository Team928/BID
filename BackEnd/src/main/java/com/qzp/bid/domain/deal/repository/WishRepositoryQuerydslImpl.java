package com.qzp.bid.domain.deal.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.qzp.bid.domain.deal.dto.QDealSimpleRes;
import com.qzp.bid.domain.deal.entity.QWish;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import com.qzp.bid.domain.deal.sale.dto.SaleSimpleRes;
import com.qzp.bid.domain.deal.sale.entity.QSale;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;

@RequiredArgsConstructor
public class WishRepositoryQuerydslImpl implements WishRepositoryQuerydsl {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public SaleListPage findSalesWithWishByMemberId(Long memberId, Pageable pageable) {
        QWish wish = QWish.wish;
        QSale sale = QSale.sale;

        List<SaleSimpleRes> saleSimpleResList = jpaQueryFactory.select(Projections.fields(
                SaleSimpleRes.class,
                new QDealSimpleRes(sale).as("dealSimpleRes"),
                sale.immediatePrice,
                sale.startPrice,
                sale.endTime,
                sale.highestBid.bidPrice.as("bid"),
                sale.status,
                Expressions.asBoolean(
                    JPAExpressions.select(wish.id)
                        .from(wish)
                        .where(
                            wish.member.id.eq(memberId),
                            wish.deal.id.eq(sale.id)
                        ).exists()
                ).as("wish")
            ))
            .from(sale)
            .where(JPAExpressions.select(wish.id)
                .from(wish)
                .where(
                    wish.member.id.eq(memberId),
                    wish.deal.id.eq(sale.id)
                ).exists()) // wish 여부가 true인 sale만 필터링
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize() + 1)
            .orderBy(sale.createTime.asc())
            .fetch();

        boolean hasNext = false;
        if (saleSimpleResList.size() > pageable.getPageSize()) {
            saleSimpleResList.remove(pageable.getPageSize());
            hasNext = true;
        }
        return new SaleListPage(saleSimpleResList, pageable.getPageNumber(), pageable.getPageSize(),
            !hasNext);
    }
}
