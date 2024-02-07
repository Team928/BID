package com.qzp.bid.domain.deal.sale.repository;

import com.qzp.bid.domain.deal.sale.entity.Bid;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, Long> {

    Optional<List<Bid>> findBySaleId(Long saleId);

    Slice<Bid> findBySaleIdAndBidderId(Long saleId, Long bidderId, Pageable pageable);
}
