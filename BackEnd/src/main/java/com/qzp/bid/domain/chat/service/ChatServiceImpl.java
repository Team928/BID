package com.qzp.bid.domain.chat.service;


import com.qzp.bid.domain.chat.entity.ChatRoom;
import com.qzp.bid.domain.chat.repository.ChatRoomRepository;
import com.qzp.bid.domain.deal.entity.Deal;
import com.qzp.bid.domain.deal.repository.DealRepository;
import com.qzp.bid.domain.member.entity.Member;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ChatServiceImpl implements ChatService {

    private final ChatRoomRepository chatRoomRepository;

    private final DealRepository dealRepository;

    @Override
    public void createRoom(long dealId) {
        Optional<Deal> deal = dealRepository.findById(dealId);

        if (deal.isPresent()) {
            String dtype = deal.get().getClass().getSimpleName(); // DTYPE 가져오기

            Optional<Member> member = Optional.empty();

            if (dtype.equals("Sale")) {
                member = dealRepository.findBidderByDealId(dealId);
            } else if (dtype.equals("Purchase")) {
                member = dealRepository.findSellerByDealId(dealId);
            }

            if (member.isPresent()) {
                long randomId = chatRoomRepository.count() + 1;
                String name = deal.get().getTitle();
                String hostId = deal.get().getWriter().getNickname();
                String guestId = member.get().getNickname();

                ChatRoom chatRoom = new ChatRoom().create(randomId, name, hostId, guestId);
                chatRoomRepository.save(chatRoom);
            }
        }


    }
}

