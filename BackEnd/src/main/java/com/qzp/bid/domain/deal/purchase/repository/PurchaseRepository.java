package com.qzp.bid.domain.deal.purchase.repository;

import com.qzp.bid.domain.deal.purchase.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

}
