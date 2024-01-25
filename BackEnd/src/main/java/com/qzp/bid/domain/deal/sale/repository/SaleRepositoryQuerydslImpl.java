package com.qzp.bid.domain.deal.sale.repository;

import static com.qzp.bid.domain.deal.sale.entity.QSale.sale;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.qzp.bid.domain.deal.dto.DealSimpleRes;
import com.qzp.bid.domain.deal.dto.SearchParam;
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
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize() + 1)
            .orderBy(sale.createTime.desc())
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
