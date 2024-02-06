package com.qzp.bid.domain.deal.purchase.repository;

import static com.qzp.bid.domain.deal.entity.QImage.image;
import static com.qzp.bid.domain.deal.purchase.entity.QPurchase.purchase;

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
import com.qzp.bid.domain.deal.purchase.dto.PurchaseListPage;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseSimpleRes;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RequiredArgsConstructor
public class PurchaseRepositoryQuerydslImpl implements PurchaseRepositoryQuerydsl {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public PurchaseListPage getPurchaseListPageBySearchParam(SearchParam searchParam) {
        BooleanBuilder booleanBuilder = createBooleanBuilder(searchParam);
        OrderSpecifier orderSpecifiers = createOrderSpecifiers(searchParam);
        Pageable pageable = PageRequest.of(searchParam.getPage(), searchParam.getSize());
        List<PurchaseSimpleRes> purchaseSimpleResList = jpaQueryFactory.select(Projections.fields(
                PurchaseSimpleRes.class,
                new QDealSimpleRes(purchase,
                    Projections.constructor(ImageSimpleDto.class, Expressions.as(
                        JPAExpressions
                            .select(image.imagePath)
                            .from(image)
                            .where(image.deal.id.eq(purchase.id))
                            .orderBy(image.createTime.asc())
                            .limit(1),
                        "imagePath"
                    ))).as("dealSimpleRes"),
                purchase.status.as("status")
            ))
            .from(purchase)
            .where(booleanBuilder)
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize() + 1)
            .orderBy(orderSpecifiers)
            .fetch();
        boolean hasNext = false;
        if (purchaseSimpleResList.size() > pageable.getPageSize()) {
            purchaseSimpleResList.remove(pageable.getPageSize());
            hasNext = true;
        }
        return new PurchaseListPage(purchaseSimpleResList, pageable.getPageNumber(),
            pageable.getPageSize(),
            !hasNext);
    }

    private OrderSpecifier createOrderSpecifiers(SearchParam searchParam) {
        DealStatus status = searchParam.getStatus();
        String order = searchParam.getOrder();
        if (status != null && order != null && order.equals("asc")) {
            if (status.equals(DealStatus.BEFORE)) {
                return new OrderSpecifier(Order.ASC, purchase.startTime);
            }
        }
        return new OrderSpecifier<>(Order.DESC, purchase.createTime);
    }

    private BooleanBuilder createBooleanBuilder(SearchParam searchParam) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!(searchParam.getCatg() == null)) {
            booleanBuilder.and(purchase.category.eq(searchParam.getCatg()));
        }
        if (!(searchParam.getKeyword() == null) && !searchParam.getKeyword().isEmpty()) {
            booleanBuilder.and(purchase.title.contains(searchParam.getKeyword()));
        }
        if (!(searchParam.getArea() == null) && !searchParam.getArea().isEmpty()) {
            booleanBuilder.and(purchase.area.contains(searchParam.getArea()));
        }
        if (!(searchParam.getStatus() == null)) {
            booleanBuilder.and(purchase.status.eq(searchParam.getStatus()));
        }
        return booleanBuilder;
    }
}
