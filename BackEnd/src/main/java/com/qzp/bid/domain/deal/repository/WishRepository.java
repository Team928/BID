package com.qzp.bid.domain.deal.repository;

import com.qzp.bid.domain.deal.entity.Deal;
import com.qzp.bid.domain.deal.entity.Wish;
import com.qzp.bid.domain.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WishRepository extends JpaRepository<Wish, Long>, WishRepositoryQuerydsl {

    boolean existsByDealIdAndMemberId(Long dealId, Long memberId);

    Optional<Wish> findByMemberAndDeal(Member member, Deal deal);

    @Query("SELECT w FROM Wish w JOIN FETCH w.deal WHERE w.isBeforeAlarm = :flag")
    List<Wish> getByIsBeforeAlarm(@Param("flag") boolean flag);

    Optional<List<Wish>> findByDealId(long dealId);
}