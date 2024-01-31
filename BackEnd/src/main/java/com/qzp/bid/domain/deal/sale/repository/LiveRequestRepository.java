package com.qzp.bid.domain.deal.sale.repository;

import com.qzp.bid.domain.deal.sale.entity.LiveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LiveRequestRepository extends JpaRepository<LiveRequest, Long> {

    boolean existsBySaleIdAndMemberId(Long saleId, Long memberId);
}
