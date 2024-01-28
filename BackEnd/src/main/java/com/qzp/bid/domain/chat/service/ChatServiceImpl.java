package com.qzp.bid.domain.chat.service;


import com.qzp.bid.domain.chat.entity.Chat;
import com.qzp.bid.domain.chat.entity.ChatRoom;
import com.qzp.bid.domain.chat.repository.ChatRepository;
import com.qzp.bid.domain.chat.repository.ChatRoomRepository;
import com.qzp.bid.domain.deal.entity.Deal;
import com.qzp.bid.domain.deal.repository.DealRepository;
import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.domain.member.repository.MemberRepository;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ChatServiceImpl implements ChatService {

    private final SimpMessageSendingOperations template;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;
    private final MemberRepository memberRepository;
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
                String roomName = deal.get().getTitle();
                long hostId = deal.get().getWriter().getId();
                long guestId = member.get().getId();

                ChatRoom chatRoom = ChatRoom.builder()
                    .dealId(dealId)
                    .roomName(roomName)
                    .hostId(hostId)
                    .guestId(guestId)
                    .build();

                chatRoomRepository.save(chatRoom);
            }
        }
    }



    @Override
    public void sendChat(Chat chat) {
        Member sender = memberRepository.findById(chat.getSenderId()).orElseThrow();

        chat.setSender(sender.getNickname());

        ZonedDateTime utcTime = ZonedDateTime.now();
        chat.setCreateTime(utcTime.toString());

        chatRepository.save(chat);

        ResponseEntity res = ResponseEntity.status(HttpStatus.OK).body(chat);

        template.convertAndSend("/sub/chat/room/" + chat.getRoomId(), res);
    }

    @Override
    public List<ChatRoom> findChatRooms(Long userId) {
        return chatRoomRepository.findAllByGuestIdOrHostIdOrderByCreateTimeDesc(userId, userId);
    }


}

