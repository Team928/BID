package com.qzp.bid.domain.deal.repository;

import com.qzp.bid.domain.deal.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealRepository<T extends Deal> extends JpaRepository<T, Long> {

}
