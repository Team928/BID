package com.qzp.bid.domain.deal.repository;

import com.qzp.bid.domain.deal.entity.Deal;
import com.qzp.bid.domain.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DealRepository<T extends Deal> extends JpaRepository<T, Long> {


    @Query("SELECT b.bidder"
        + " FROM Deal d JOIN Bid b ON d.id = b.id"
        + " WHERE d.id = :dealId and b.isSuccess = true")
    Optional<Member> findBidderByDealId(
        @Param("dealId") long dealId); // dealId로 경매 낙찰자가 있으면 테이블 반환

    @Query("SELECT m"
        + " FROM Deal d JOIN ReverseAuctionResult r ON d.id = r.id"
        + " JOIN Member m ON r.sellerId = m.id"
        + " WHERE d.id = :dealId")
    Optional<Member> findSellerByDealId(
        @Param("dealId") long dealId); // dealId로 역경매 낙찰자가 있으면 테이블 반환

}
