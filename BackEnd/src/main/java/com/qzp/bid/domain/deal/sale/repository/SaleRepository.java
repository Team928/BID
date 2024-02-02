package com.qzp.bid.domain.deal.sale.repository;

import com.qzp.bid.domain.deal.entity.DealStatus;
import com.qzp.bid.domain.deal.sale.entity.Sale;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SaleRepository extends JpaRepository<Sale, Long>, SaleRepositoryQuerydsl {

    @Query("SELECT s FROM Sale s WHERE s.status = :status")
    Optional<List<Sale>> findSalesByStatus(@Param("status") DealStatus status);

    Optional<List<Sale>> findByStatusIsNot(DealStatus status);
}
