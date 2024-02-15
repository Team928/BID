package com.qzp.bid.domain.deal.purchase.repository;

import com.qzp.bid.domain.deal.purchase.entity.ApplyForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplyFormRepository extends JpaRepository<ApplyForm, Long> {

//    @Query("SELECT a "
//        + "FROM ApplyForm a JOIN ReverseAuctionResult r ON a.purchase.id = r.purchaseId "
//        + "WHERE r.sellerId in :ApplyIds")
//    ApplyForm findApplyFormByWinningId(List<Long> ApplyIds);

}
