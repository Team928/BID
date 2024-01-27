package com.qzp.bid.domain.deal.sale.repository;

import static com.qzp.bid.domain.deal.sale.entity.QSale.sale;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.qzp.bid.domain.deal.dto.DealSimpleRes;
import com.qzp.bid.domain.deal.dto.SearchParam;
import com.qzp.bid.domain.deal.entity.DealStatus;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import com.qzp.bid.domain.deal.sale.dto.SaleSimpleRes;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RequiredArgsConstructor
public class SaleRepositoryQuerydslImpl implements SaleRepositoryQuerydsl {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public SaleListPage getSaleListPageBySearchParam(SearchParam searchParam) {
        BooleanBuilder booleanBuilder = createBooleanBuilder(searchParam);
        OrderSpecifier orderSpecifiers = createOrderSpecifiers(searchParam);

        Pageable pageable = PageRequest.of(searchParam.getPage(), searchParam.getSize());
        List<SaleSimpleRes> saleSimpleResList = jpaQueryFactory.select(Projections.fields(
                SaleSimpleRes.class,
                Projections.fields(
                    DealSimpleRes.class,
                    sale.id,
                    sale.title,
                    sale.content,
                    sale.category,
                    sale.createTime,
                    sale.startTime
                    //sale.images.get(0).imagePath // TODO: 이미지, bid 작업 후 수정 필요
                ).as("dealSimpleRes"),
                sale.immediatePrice,
                sale.startPrice,
                sale.endTime,
                //sale.highestBid.bidPrice,
                sale.status
            ))
            .from(sale)
            .where(booleanBuilder)
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize() + 1)
            .orderBy(orderSpecifiers)
            .fetch();
        boolean hasNext = false;
        if (saleSimpleResList.size() > pageable.getPageSize()) {
            saleSimpleResList.remove(pageable.getPageSize());
            hasNext = true;
        }
        return new SaleListPage(saleSimpleResList, pageable.getPageNumber(), pageable.getPageSize(),
            !hasNext);
    }

    private OrderSpecifier createOrderSpecifiers(SearchParam searchParam) {
        DealStatus status = searchParam.getStatus();
        String order = searchParam.getOrder();
        if (status != null && order != null && order.equals("asc")) {
            if (status.equals(DealStatus.BEFORE)) {
                return new OrderSpecifier(Order.ASC, sale.startTime);
            } else {
                return new OrderSpecifier(Order.ASC, sale.endTime);
            }
        }
        return new OrderSpecifier<>(Order.DESC, sale.createTime);
    }

    private BooleanBuilder createBooleanBuilder(SearchParam searchParam) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!(searchParam.getCatg() == null)) {
            booleanBuilder.and(sale.category.eq(searchParam.getCatg()));
        }
        if (!(searchParam.getKeyword() == null) && !searchParam.getKeyword().isEmpty()) {
            booleanBuilder.and(sale.title.contains(searchParam.getKeyword()));
        }
        if (!(searchParam.getArea() == null) && !searchParam.getArea().isEmpty()) {
            booleanBuilder.and(sale.area.contains(searchParam.getArea()));
        }
        if (!(searchParam.getStatus() == null)) {
            booleanBuilder.and(sale.status.eq(searchParam.getStatus()));
        }
        return booleanBuilder;
    }
}
