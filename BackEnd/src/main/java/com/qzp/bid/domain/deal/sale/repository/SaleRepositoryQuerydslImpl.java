package com.qzp.bid.domain.deal.sale.repository;

import static com.qzp.bid.domain.deal.entity.QImage.image;
import static com.qzp.bid.domain.deal.sale.entity.QSale.sale;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.qzp.bid.domain.deal.dto.ImageSimpleDto;
import com.qzp.bid.domain.deal.dto.QDealSimpleRes;
import com.qzp.bid.domain.deal.dto.SearchParam;
import com.qzp.bid.domain.deal.entity.DealStatus;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import com.qzp.bid.domain.deal.sale.dto.SaleSimpleRes;
import java.util.ArrayList;
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
        List<OrderSpecifier<?>> orderSpecifiers = createOrderSpecifiers(searchParam);
        Pageable pageable = PageRequest.of(searchParam.getPage(), searchParam.getSize());
        List<SaleSimpleRes> saleSimpleResList = jpaQueryFactory.select(Projections.fields(
                SaleSimpleRes.class,
                new QDealSimpleRes(sale,
                    Projections.constructor(ImageSimpleDto.class, Expressions.as(
                        JPAExpressions
                            .select(image.imagePath)
                            .from(image)
                            .where(image.deal.id.eq(sale.id))
                            .orderBy(image.createTime.asc())
                            .limit(1),
                        "imagePath"
                    ))).as("dealSimpleRes"),
                sale.immediatePrice,
                sale.startPrice,
                sale.endTime,
                sale.highestBid.bidPrice.as("bid"),
                sale.status
            ))
            .from(sale)
            .where(booleanBuilder)
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize() + 1)
            .orderBy(orderSpecifiers.toArray(new OrderSpecifier[orderSpecifiers.size()]))
            .fetch();
        boolean hasNext = false;
        if (saleSimpleResList.size() > pageable.getPageSize()) {
            saleSimpleResList.remove(pageable.getPageSize());
            hasNext = true;
        }
        return new SaleListPage(saleSimpleResList, pageable.getPageNumber(), pageable.getPageSize(),
            !hasNext);
    }

    @Override
    public SaleListPage findSalesByWriterId(Long writerId, Pageable pageable) {

        List<SaleSimpleRes> saleSimpleResList = jpaQueryFactory
            .select(Projections.fields(
                SaleSimpleRes.class,
                new QDealSimpleRes(sale,
                    Projections.constructor(ImageSimpleDto.class, Expressions.as(
                        JPAExpressions
                            .select(image.imagePath)
                            .from(image)
                            .where(image.deal.id.eq(sale.id))
                            .orderBy(image.createTime.asc())
                            .limit(1),
                        "imagePath"
                    ))).as("dealSimpleRes"),
                sale.immediatePrice,
                sale.startPrice,
                sale.endTime,
                sale.highestBid.bidPrice.as("bid"),
                sale.status
            ))
            .from(sale)
            .where(sale.writer.id.eq(writerId)) // 작성자 id로 필터링
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize() + 1)
            .orderBy(sale.createTime.asc()) // 생성시간 오름차순으로 정렬
            .fetch();

        boolean isLast = true;
        if (saleSimpleResList.size() > pageable.getPageSize()) {
            saleSimpleResList.remove(pageable.getPageSize());
            isLast = false;
        }

        return new SaleListPage(saleSimpleResList, pageable.getPageNumber(), pageable.getPageSize(),
            isLast);
    }


    private List<OrderSpecifier<?>> createOrderSpecifiers(SearchParam searchParam) {
        List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();

        DealStatus status = searchParam.getStatus();
        String order = searchParam.getOrder();
        if (status != null && order != null) {
            if (order.equals("asc")) {
                if (status.equals(DealStatus.BEFORE)) {
                    orderSpecifiers.add(new OrderSpecifier<>(Order.ASC, sale.startTime));
                } else {
                    orderSpecifiers.add(new OrderSpecifier<>(Order.ASC, sale.endTime));
                }
            } else if (order.equals("hot")) {
                orderSpecifiers.add(
                    new OrderSpecifier<>(Order.DESC, sale.bidCount));
                orderSpecifiers.add(
                    new OrderSpecifier<>(Order.DESC,
                        (sale.highestBid.bidPrice.subtract(sale.startPrice))));
            }
            return orderSpecifiers;
        }
        orderSpecifiers.add(new OrderSpecifier<>(Order.DESC, sale.createTime));
        return orderSpecifiers;
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
