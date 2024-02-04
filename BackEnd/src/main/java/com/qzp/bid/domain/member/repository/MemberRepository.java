package com.qzp.bid.domain.member.repository;

import com.qzp.bid.domain.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findMemberByEmail(String email);

    boolean existsByNickname(String nickname);

    Optional<Member> findMemberByNickname(String nickname);

}
