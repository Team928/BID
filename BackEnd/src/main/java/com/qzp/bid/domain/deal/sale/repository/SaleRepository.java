package com.qzp.bid.domain.deal.sale.repository;

import com.qzp.bid.domain.deal.sale.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long>, SaleRepositoryQuerydsl {

    boolean existsById(long id);
}
