package com.qzp.bid.domain.member.repository;

import com.qzp.bid.domain.member.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewRepositoryQuerydsl {

}
