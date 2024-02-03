package com.qzp.bid.domain.chat.service;


import com.qzp.bid.domain.chat.dto.ChatRes;
import com.qzp.bid.domain.chat.dto.ChatRoomRes;
import com.qzp.bid.domain.chat.entity.Chat;
import com.qzp.bid.domain.chat.entity.ChatRoom;
import com.qzp.bid.domain.chat.entity.ChatType;
import com.qzp.bid.domain.chat.repository.ChatRepository;
import com.qzp.bid.domain.chat.repository.ChatRoomRepository;
import com.qzp.bid.domain.deal.entity.Deal;
import com.qzp.bid.domain.deal.repository.DealRepository;
import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.domain.member.repository.MemberRepository;
import com.qzp.bid.global.config.WebSocketConfig;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import com.qzp.bid.global.result.error.ErrorCode;
import com.qzp.bid.global.result.error.exception.BusinessException;
import com.qzp.bid.global.security.util.AccountUtil;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ChatServiceImpl implements ChatService {

    private final WebSocketConfig webSocketConfig;
    private final SimpMessageSendingOperations template;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;
    private final MemberRepository memberRepository;
    private final DealRepository dealRepository;
    private final AccountUtil accountUtil;
    private final RedisTemplate redisTemplate;

    @Override
    @Transactional
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
    @Transactional
    public void sendChat(Chat chat, long roomId) {

        chat.setRoomId(roomId);
        if(!chat.getType().equals(ChatType.TALK)){
            throw new BusinessException(ErrorCode.INPUT_VALUE_INVALID);
        }

        Member sender = memberRepository.findById(chat.getSenderId())
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_ID_NOT_EXIST));

        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(chat.getRoomId());
        if (!chatRoom.isPresent()) {
            throw new BusinessException(ErrorCode.CHATROOM_NOT_EXIST);
        }

        if (redisTemplate.opsForHash().get("SubDestination", "/sub/chat/room/"+roomId) != null
            && (int)redisTemplate.opsForHash().get("SubDestination", "/sub/chat/room/"+roomId) == 2){
            chat.setRead(true);
        }

        chat.setSender(sender.getNickname());
        chat.setCreateTime(LocalDateTime.now().toString());
        chatRepository.save(chat);

        chatRoom.get().setLastMessage(chat.getMessage());
        chatRoomRepository.save(chatRoom.get());

        ResponseEntity<ResultResponse> res = ResponseEntity.ok(ResultResponse.of(ResultCode. CREATE_CHAT_SUCCESS, chat));
        template.convertAndSend("/sub/chats/rooms/" + chat.getRoomId(), res);
        //TODO 여기에 아마 채팅 갱신하라는 명령이 전달 되어야 할 것 같아요...SSE?

    }

    @Override
    public List<ChatRoomRes> findChatRooms(Long userId) {
        List<ChatRoom> chatRoomList = chatRoomRepository.findAllByGuestIdOrHostIdOrderByCreateTimeDesc(userId, userId);
        List<ChatRoomRes> result = new ArrayList<>();

        for (ChatRoom chatRoom : chatRoomList) {
            ChatRoomRes chatRoomRes = ChatRoomRes.builder()
                .chatRoom(chatRoom)
                .build();
            if(userId != chatRoom.getLastSenderId()){
                int countUmReadChats = chatRepository.countAllByRoomIdAndReadIsFalse(userId);
                chatRoomRes.setUnReadCount(countUmReadChats);
            }
            result.add(chatRoomRes);
        }

        return result;
    }


    @Override
    @Transactional
    public List<ChatRes> findChats(long roomId) {
        long userId = Long.parseLong(accountUtil.getLoginMemberId());
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(() -> new BusinessException(ErrorCode.CHATROOM_NOT_EXIST));
        if(chatRoom.getLastSenderId() != userId){
            List<Chat> chats = chatRepository.findUnReadChats(roomId);
            for (Chat chat : chats) {
                if(chat.getSenderId() != userId){
                    chat.setRead(true);
                    chatRepository.save(chat);
                }
            }
        }
        return chatRepository.findAllByRoomIdOrderByCreateTime(roomId);
    }


    @Override
    @Transactional
    public void exitChatRooms(long chatRoomId) {

        long userId = Long.parseLong(accountUtil.getLoginMemberId());
        Optional<ChatRoom> optionalChatRoom = chatRoomRepository.findById(chatRoomId);

        if (optionalChatRoom.isPresent()){
            ChatRoom chatRoom = optionalChatRoom.get();

            if(chatRoom.getDealConfirmed() == null || chatRoom.getDealConfirmed().size() != 2){
                throw new BusinessException(ErrorCode.EXIT_CHATROOM_FAIL);
            }

            chatRoom.setHostId(chatRoom.getHostId() == userId ? -1 : chatRoom.getHostId());
            chatRoom.setGuestId(chatRoom.getGuestId() == userId ? -1 : chatRoom.getGuestId());

            if (chatRoom.getHostId() == -1 && chatRoom.getGuestId() == -1){
                chatRoomRepository.delete(chatRoom);
                chatRepository.deleteAllByRoomId(chatRoomId);
            }else{
                chatRoomRepository.save(chatRoom);
            }

        }
    }

    @Override
    @Transactional
    public void dealConfirmed(long chatRoomId) {
        long userId = Long.parseLong(accountUtil.getLoginMemberId());
        Optional<ChatRoom> optionalChatRoom = chatRoomRepository.findById(chatRoomId);
        if(optionalChatRoom.isPresent()){
            ChatRoom chatRoom = optionalChatRoom.get();
            Set<Long> confirmedIds = (chatRoom.getDealConfirmed() == null)?new HashSet<>():chatRoom.getDealConfirmed();
            confirmedIds.add(userId);
            chatRoom.setDealConfirmed(confirmedIds);
            chatRoomRepository.save(chatRoom);
        }
    }


}

