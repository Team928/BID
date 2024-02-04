package com.qzp.bid.domain.deal.purchase.repository;

import com.qzp.bid.domain.deal.purchase.entity.ApplyForm;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ApplyFormRepository extends JpaRepository<ApplyForm, Long> {

    @Query("SELECT a "
        + "FROM ApplyForm a JOIN ReverseAuctionResult r ON a.id = r.purchaseId "
        + "WHERE r.winningBid in :ApplyIds")
    ApplyForm findApplyFormByWinningId(List<Long> ApplyIds);
}
