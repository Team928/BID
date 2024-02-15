package com.qzp.bid.domain.deal.purchase.repository;

import com.qzp.bid.domain.deal.purchase.entity.ReverseAuctionResult;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReverseAuctionResultRepository extends JpaRepository<ReverseAuctionResult, Long> {

    boolean existsBySellerId(long sellerId);

    Optional<ReverseAuctionResult> findByPurchaseId(Long purchaseId);
}
