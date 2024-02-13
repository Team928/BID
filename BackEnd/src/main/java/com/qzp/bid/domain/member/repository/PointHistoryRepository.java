package com.qzp.bid.domain.member.repository;

import com.qzp.bid.domain.member.entity.PointHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointHistoryRepository extends JpaRepository<PointHistory, Long>, PointHistoryRepositoryQuerydsl {

}
