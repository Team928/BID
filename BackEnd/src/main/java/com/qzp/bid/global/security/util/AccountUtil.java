package com.qzp.bid.global.security.util;

import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.domain.member.repository.MemberRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class AccountUtil {

    private final MemberRepository memberRepository;

    public String getLoginMemberId(){
        try{
            return SecurityContextHolder.getContext().getAuthentication().getName(); //사용자 아이디
        }catch(Exception e){
            throw new RuntimeException();
        }
    }

    public Optional<Member> getLoginMember() {
        try {
            final long memberId = Long.parseLong(
                SecurityContextHolder.getContext().getAuthentication().getName());
            return memberRepository.findById(memberId);
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

    public boolean checkLoginMember(long memberId){
        try {
            long loginMemberId = Long.parseLong(
                SecurityContextHolder.getContext().getAuthentication().getName());
            return loginMemberId==memberId;
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

}
