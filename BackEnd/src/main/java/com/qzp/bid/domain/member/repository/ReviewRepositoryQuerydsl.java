package com.qzp.bid.domain.member.repository;

import com.qzp.bid.domain.member.dto.ReviewListPage;
import org.springframework.data.domain.Pageable;

public interface ReviewRepositoryQuerydsl {

    ReviewListPage getReviewListPageByWriterId(long reviewerId, Pageable pageable);

}
