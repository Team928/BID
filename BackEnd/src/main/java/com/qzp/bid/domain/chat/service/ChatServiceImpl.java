package com.qzp.bid.domain.chat.service;


import com.qzp.bid.domain.chat.dto.ChatList;
import com.qzp.bid.domain.chat.dto.ChatLive;
import com.qzp.bid.domain.chat.dto.ChatRes;
import com.qzp.bid.domain.chat.dto.ChatRoomList;
import com.qzp.bid.domain.chat.entity.Chat;
import com.qzp.bid.domain.chat.entity.ChatRoom;
import com.qzp.bid.domain.chat.entity.ChatType;
import com.qzp.bid.domain.chat.mapper.ChatRoomMapper;
import com.qzp.bid.domain.chat.repository.ChatRepository;
import com.qzp.bid.domain.chat.repository.ChatRoomRepository;
import com.qzp.bid.domain.deal.dto.DealResWithEndPrice;
import com.qzp.bid.domain.deal.entity.Deal;
import com.qzp.bid.domain.deal.entity.Image;
import com.qzp.bid.domain.deal.mapper.DealMapper;
import com.qzp.bid.domain.deal.purchase.entity.ApplyForm;
import com.qzp.bid.domain.deal.purchase.entity.Purchase;
import com.qzp.bid.domain.deal.purchase.repository.ApplyFormRepository;
import com.qzp.bid.domain.deal.purchase.repository.PurchaseRepository;
import com.qzp.bid.domain.deal.repository.DealRepository;
import com.qzp.bid.domain.deal.sale.entity.Sale;
import com.qzp.bid.domain.deal.sale.repository.SaleRepository;
import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.domain.member.mapper.MemberMapper;
import com.qzp.bid.domain.member.repository.MemberRepository;
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
import java.util.stream.Collectors;
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

    private final SimpMessageSendingOperations template;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;
    private final MemberRepository memberRepository;
    private final DealRepository<Deal> dealRepository;
    private final SaleRepository saleRepository;
    private final PurchaseRepository purchaseRepository;
    private final AccountUtil accountUtil;
    private final RedisTemplate redisTemplate;
    private final MemberMapper memberMapper;
    private final ChatRoomMapper chatRoomMapper;
    private final DealMapper dealMapper;
    private final ApplyFormRepository applyFormRepository;

    @Override
    @Transactional
    public void createRoom(long dealId) {
        Deal deal = dealRepository.findById(dealId)
            .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));

        String dtype = deal.getClass().getSimpleName(); // DTYPE 가져오기

        Optional<Member> member = Optional.empty();

        if (dtype.equals("Sale")) {
            member = dealRepository.findBidderByDealId(dealId);
        } else if (dtype.equals("Purchase")) {
            member = dealRepository.findSellerByDealId(dealId);
        }

        if (member.isPresent()) {
            String roomName = deal.getTitle();
            long hostId = deal.getWriter().getId();
            long guestId = member.get().getId();

            ChatRoom chatRoom = ChatRoom.builder().dealId(dealId).roomName(roomName)
                .hostId(hostId).guestId(guestId).build();

            chatRoomRepository.save(chatRoom);
        }

    }


    @Override
    @Transactional
    public void sendChat(Chat chat, long roomId) {

        chat.setRoomId(roomId);
        if (!chat.getType().equals(ChatType.TALK)) {
            throw new BusinessException(ErrorCode.INPUT_VALUE_INVALID);
        }

        Member sender = memberRepository.findById(chat.getSenderId())
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_ID_NOT_EXIST));

        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(chat.getRoomId());
        if (!chatRoom.isPresent()) {
            throw new BusinessException(ErrorCode.CHATROOM_NOT_EXIST);
        }

        if (redisTemplate.opsForHash().get("SubDestination", "/sub/chat/room/" + roomId) != null
            && (int) redisTemplate.opsForHash().get("SubDestination", "/sub/chat/room/" + roomId)
            == 2) {
            chat.setRead(true);
        }

        chat.setSender(sender.getNickname());
        chat.setCreateTime(LocalDateTime.now().toString());
        chatRepository.save(chat);

        chatRoom.get().setLastMessage(chat.getMessage());
        chatRoomRepository.save(chatRoom.get());

        ResponseEntity<ResultResponse> res = ResponseEntity.ok(
            ResultResponse.of(ResultCode.CREATE_CHAT_SUCCESS, chat));
        template.convertAndSend("/sub/chats/rooms/" + chat.getRoomId(), res);
        //TODO 여기에 아마 채팅 갱신하라는 명령이 전달 되어야 할 것 같아요...SSE?

    }

    @Override
    @Transactional
    public void sendLiveChat(Chat chat, long roomId) {

        Member member = memberRepository.findById((chat.getSenderId()))
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_ID_NOT_EXIST));

        chat.setSender(member.getNickname());
        chat.setRoomId(roomId);
        ChatLive chatLive = chatRoomMapper.toChatLive(chat);

        ResponseEntity<ResultResponse> res = ResponseEntity.ok(
            ResultResponse.of(ResultCode.SEND_CHAT_SUCCESS, chatLive));

        template.convertAndSend("/sub/chats/lives/" + roomId, res);


    }


    @Override
    public List<ChatRoomList> findChatRooms(Long userId) {
        List<ChatRoom> chatRoomList = chatRoomRepository.findAllByGuestIdOrHostIdOrderByCreateTimeDesc(
            userId, userId);
        List<ChatRoomList> result = new ArrayList<>();

        for (ChatRoom chatRoom : chatRoomList) {

            Member member;
            if (chatRoom.getHostId() == userId) {
                member = memberRepository.findById(chatRoom.getGuestId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_ID_NOT_EXIST));
            } else {
                member = memberRepository.findById(chatRoom.getHostId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_ID_NOT_EXIST));
            }

            ChatRoomList chatRoomRes = ChatRoomList.builder()
                .chatRoomRes(chatRoomMapper.toChatRoomRes(chatRoom))
                .exitPossible((chatRoom.getDealConfirmed().size() == 2) ? true : false)
                .audienceMemberRes(memberMapper.toOpponentMemberRes(member)).build();
            if (userId != chatRoom.getLastSenderId()) {
                int countUmReadChats = chatRepository.countAllByRoomIdAndReadIsFalse(
                    chatRoom.getId());
                chatRoomRes.setUnReadCount(countUmReadChats);
            }

            result.add(chatRoomRes);
        }

        return result;
    }


    @Override
    @Transactional
    public ChatList findChats(long roomId) {
        long userId = Long.parseLong(accountUtil.getLoginMemberId());
        ChatRoom chatRoom = chatRoomRepository.findById(roomId)
            .orElseThrow(() -> new BusinessException(ErrorCode.CHATROOM_NOT_EXIST));

        List<Chat> listChat = chatRepository.findAllByRoomIdOrderByCreateTime(roomId);

        // 챗 읽기 처리
        if (chatRoom.getLastSenderId() != userId) {
            for (int i = 0; i < chatRepository.countAllByRoomIdAndReadIsFalse(roomId); i++) {
                Chat readChat = listChat.get(i);
                readChat.setRead(true);
                chatRepository.save(readChat);
                listChat.set(i, readChat);
            }
        }

        List<ChatRes> chatRes = new ArrayList<>(); // 채팅 내역
        for (Chat chat : listChat) {
            chatRes.add(chatRoomMapper.toChatRes(chat));
        }

        Deal deal = dealRepository.findById(chatRoom.getDealId()) // 거래 정보
            .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));

        DealResWithEndPrice dealResWithEndPrice = new DealResWithEndPrice(deal);
        dealResWithEndPrice.setImages(
            deal.getImages().stream()
                .map(Image::getImagePath)
                .collect(Collectors.toList()));

        if (deal.getClass().getSimpleName().equals("Sale")) { // 거래 낙찰가격 가지고 오기
            Sale sale = saleRepository.findById(deal.getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));

            dealResWithEndPrice.setEndPrice(sale.getHighestBid().getBidPrice());

        } else {
            Purchase purchase = purchaseRepository.findById(deal.getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.GET_PURCHASE_FAIL));

            List<Long> sellerIds = purchase.getApplyForms().stream()
                .map(ApplyForm::getSellerId)
                .collect(Collectors.toList());

            ApplyForm applyForm = applyFormRepository.findApplyFormByWinningId(sellerIds);
            dealResWithEndPrice.setEndPrice(applyForm.getOfferPrice());
        }

        ChatList chatList = ChatList.builder()
            .chatResList(chatRes)
            .dealResWithEndPrice(dealResWithEndPrice)
            .exitRoomPossible((chatRoom.getDealConfirmed().size() == 2) ? true : false)
            .build();

        return chatList;

    }


    @Override
    @Transactional
    public void exitChatRooms(long chatRoomId) {

        long userId = Long.parseLong(accountUtil.getLoginMemberId());
        Optional<ChatRoom> optionalChatRoom = chatRoomRepository.findById(chatRoomId);

        if (optionalChatRoom.isPresent()) {
            ChatRoom chatRoom = optionalChatRoom.get();

            if (chatRoom.getDealConfirmed().size() != 2) {
                throw new BusinessException(ErrorCode.EXIT_CHATROOM_FAIL);
            }

            chatRoom.setHostId(chatRoom.getHostId() == userId ? -1 : chatRoom.getHostId());
            chatRoom.setGuestId(chatRoom.getGuestId() == userId ? -1 : chatRoom.getGuestId());

            if (chatRoom.getHostId() == -1 && chatRoom.getGuestId() == -1) {
                chatRoomRepository.delete(chatRoom);
                chatRepository.deleteAllByRoomId(chatRoomId);
            } else {
                chatRoomRepository.save(chatRoom);
            }

        }
    }

    @Override
    @Transactional
    public void dealConfirmed(long chatRoomId) {
        long userId = Long.parseLong(accountUtil.getLoginMemberId());
        Optional<ChatRoom> optionalChatRoom = chatRoomRepository.findById(chatRoomId);
        if (optionalChatRoom.isPresent()) {
            ChatRoom chatRoom = optionalChatRoom.get();
            Set<Long> confirmedIds = (chatRoom.getDealConfirmed() == null) ? new HashSet<>()
                : chatRoom.getDealConfirmed();
            confirmedIds.add(userId);
            chatRoom.setDealConfirmed(confirmedIds);
            chatRoomRepository.save(chatRoom);
        }
    }


}

