package com.qzp.bid.domain.chat.service;


import com.qzp.bid.domain.chat.dto.ChatList;
import com.qzp.bid.domain.chat.dto.ChatLive;
import com.qzp.bid.domain.chat.dto.ChatRes;
import com.qzp.bid.domain.chat.dto.ChatRoomList;
import com.qzp.bid.domain.chat.dto.LiveResultReq;
import com.qzp.bid.domain.chat.entity.Chat;
import com.qzp.bid.domain.chat.entity.ChatRoom;
import com.qzp.bid.domain.chat.entity.ChatType;
import com.qzp.bid.domain.chat.mapper.ChatRoomMapper;
import com.qzp.bid.domain.chat.repository.ChatRepository;
import com.qzp.bid.domain.chat.repository.ChatRoomRepository;
import com.qzp.bid.domain.deal.dto.DealResWithEndPrice;
import com.qzp.bid.domain.deal.entity.Deal;
import com.qzp.bid.domain.deal.entity.DealStatus;
import com.qzp.bid.domain.deal.entity.Image;
import com.qzp.bid.domain.deal.purchase.entity.ApplyForm;
import com.qzp.bid.domain.deal.purchase.entity.Purchase;
import com.qzp.bid.domain.deal.purchase.entity.ReverseAuctionResult;
import com.qzp.bid.domain.deal.purchase.repository.ApplyFormRepository;
import com.qzp.bid.domain.deal.purchase.repository.PurchaseRepository;
import com.qzp.bid.domain.deal.purchase.repository.ReverseAuctionResultRepository;
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
import java.util.List;
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

    private final MemberMapper memberMapper;
    private final ChatRoomMapper chatRoomMapper;
    private final SimpMessageSendingOperations template;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;
    private final MemberRepository memberRepository;
    private final DealRepository<Deal> dealRepository;
    private final SaleRepository saleRepository;
    private final PurchaseRepository purchaseRepository;
    private final AccountUtil accountUtil;
    private final RedisTemplate redisTemplate;
    private final ApplyFormRepository applyFormRepository;
    private final ReverseAuctionResultRepository reverseAuctionResultRepository;

    @Override
    @Transactional
    public void createRoom(LiveResultReq resultReq) {

        long dealId = resultReq.getDealId();
        Deal deal = dealRepository.findById(dealId)
            .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));
        String dtype = deal.getClass().getSimpleName(); // DTYPE 가져오기
        Member guest = null;

        if (dtype.equals("Sale")) {
            guest = dealRepository.findBidderByDealId(dealId)
                .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_ID_NOT_EXIST));
        } else if (dtype.equals("Purchase")) {
            // Purchase 상태 바꾸기
            Purchase purchase = purchaseRepository.findById(dealId)
                .orElseThrow(() -> new BusinessException(ErrorCode.GET_PURCHASE_FAIL));
            purchase.setStatus(DealStatus.END);
            purchaseRepository.save(purchase);

            ApplyForm applyForm = applyFormRepository.findById(resultReq.getApplyFormId())
                .orElseThrow(() -> new BusinessException(ErrorCode.GET_APPLYFORM_FAIL));
            // 역 경매결과 생성 저장
            ReverseAuctionResult reverseAuctionResult = ReverseAuctionResult.builder()
                .winningBid((int) resultReq.getApplyFormId())
                .purchaseId(dealId)
                .sellerId(applyForm.getSeller().getId())
                .build();
            reverseAuctionResultRepository.save(reverseAuctionResult);

            guest = dealRepository.findSellerByDealId(dealId)
                .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_ID_NOT_EXIST));
        }

        String roomName = deal.getTitle();
        long hostId = deal.getWriter().getId();
        long guestId = guest.getId();

        ChatRoom chatRoom = ChatRoom.builder().dealId(dealId).roomName(roomName)
            .hostId(hostId).guestId(guestId).build();

        chatRoomRepository.save(chatRoom);
    }


    @Override
    @Transactional
    public void sendChat(Chat chat, long dealId) {

        chat.setDealId(dealId);
        if (!chat.getType().equals(ChatType.TALK)) {
            throw new BusinessException(ErrorCode.INPUT_VALUE_INVALID);
        }

        Member sender = memberRepository.findById(chat.getSenderId())
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_ID_NOT_EXIST));

        ChatRoom chatRoom = chatRoomRepository.findChatRoomByDealId(chat.getDealId())
            .orElseThrow(() -> new BusinessException(ErrorCode.CHATROOM_NOT_EXIST));

        if (redisTemplate.opsForHash().get("SubDestination", "/sub/chat/room/" + dealId) != null
            && (int) redisTemplate.opsForHash().get("SubDestination", "/sub/chat/room/" + dealId)
            == 2) {
            chat.setRead(true);
        }

        chat.setSender(sender.getNickname());
        chat.setCreateTime(LocalDateTime.now().toString());
        chatRepository.save(chat);

        chatRoom.setLastMessage(chat.getMessage());
        chatRoom.setLastSenderId(chat.getSenderId());
        chatRoomRepository.save(chatRoom);

        ResponseEntity<ResultResponse> res = ResponseEntity.ok(
            ResultResponse.of(ResultCode.CREATE_CHAT_SUCCESS, chat));
        template.convertAndSend("/sub/chats/rooms/" + dealId, res);
        //TODO 여기에 아마 채팅 갱신하라는 명령이 전달 되어야 할 것 같아요...SSE?

    }

    @Override
    @Transactional
    public void sendLiveChat(Chat chat, long dealId) {

        Member member = memberRepository.findById((chat.getSenderId()))
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_ID_NOT_EXIST));

        chat.setSender(member.getNickname());
        chat.setDealId(dealId);
        chat.setCreateTime(LocalDateTime.now().toString());
        ChatLive chatLive = chatRoomMapper.toChatLive(chat);

        ResponseEntity<ResultResponse> res = ResponseEntity.ok(
            ResultResponse.of(ResultCode.SEND_CHAT_SUCCESS, chatLive));

        template.convertAndSend("/sub/chats/lives/" + dealId, res);

    }


    @Override
    public List<ChatRoomList> findChatRooms(Long userId) {
        List<ChatRoom> chatRoomList = chatRoomRepository.findAllByGuestIdOrHostIdOrderByCreateTimeDesc(
            userId, userId);
        List<ChatRoomList> result = new ArrayList<>();

        for (ChatRoom chatRoom : chatRoomList) {

            Member member = null;
            if (chatRoom.getHostId() != -1 && chatRoom.getHostId() == userId) {
                member = memberRepository.findById(chatRoom.getGuestId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_ID_NOT_EXIST));
            } else if (chatRoom.getHostId() != -1 && chatRoom.getGuestId() == userId) {
                member = memberRepository.findById(chatRoom.getHostId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_ID_NOT_EXIST));
            } else {
                member = memberRepository.findById(userId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_ID_NOT_EXIST));
            }

            ChatRoomList chatRoomRes = ChatRoomList.builder()
                .chatRoomRes(chatRoomMapper.toChatRoomRes(chatRoom))
                .exitPossible((chatRoom.getDealConfirmed().size() == 2) ? true : false)
                .audienceMemberRes(memberMapper.toOpponentMemberRes(member))
                .build();
            if (userId != chatRoom.getLastSenderId()) {
                int countUmReadChats = chatRepository.countAllByDealIdAndReadIsFalse(
                    chatRoom.getDealId());
                chatRoomRes.setUnReadCount(countUmReadChats);
            }

            result.add(chatRoomRes);
        }

        return result;
    }


    @Override
    @Transactional
    public ChatList findChats(long dealId) {

        long userId = Long.parseLong(accountUtil.getLoginMemberId());

        ChatRoom chatRoom = chatRoomRepository.findChatRoomByDealId(dealId)
            .orElseThrow(() -> new BusinessException(ErrorCode.CHATROOM_NOT_EXIST));

        // 챗 읽기 처리
        if (chatRoom.getLastSenderId() != userId) {
            List<Chat> chats = chatRepository.findAllByDealIdAndReadIsFalse(dealId);
            for (Chat chat : chats) {
                chat.setRead(true);
                chatRepository.save(chat);
            }
        }

        List<Chat> listChat = chatRepository.findAllByDealIdOrderByCreateTime(dealId);
        List<ChatRes> chatRes = new ArrayList<>(); // 채팅 내역
        for (Chat chat : listChat) {
            chatRes.add(chatRoomMapper.toChatRes(chat));
        }

        Deal deal = dealRepository.findById(dealId) // 거래 정보
            .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));

        DealResWithEndPrice dealResWithEndPrice = new DealResWithEndPrice(deal);
        dealResWithEndPrice.setImages(
            deal.getImages().stream()
                .map(Image::getImagePath)
                .collect(Collectors.toList()));

        if (deal.getClass().getSimpleName().equals("Sale")) { // 거래 낙찰가격 가지고 오기
            Sale sale = saleRepository.findById(dealId)
                .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));

            dealResWithEndPrice.setEndPrice(sale.getHighestBid().getBidPrice());

        } else {
            Purchase purchase = purchaseRepository.findById(dealId)
                .orElseThrow(() -> new BusinessException(ErrorCode.GET_PURCHASE_FAIL));

            List<Long> sellerIds = purchase.getApplyForms().stream()
                .map(applyForm -> applyForm.getSeller().getId())
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
    public void exitChatRooms(long dealId) {

        long userId = Long.parseLong(accountUtil.getLoginMemberId());
        ChatRoom chatRoom = chatRoomRepository.findChatRoomByDealId(dealId)
            .orElseThrow(() -> new BusinessException(ErrorCode.CHATROOM_NOT_EXIST));

        if (chatRoom.getDealConfirmed().size() != 2) {
            throw new BusinessException(ErrorCode.EXIT_CHATROOM_FAIL);
        }

        chatRoom.setHostId(chatRoom.getHostId() == userId ? -1 : chatRoom.getHostId());
        chatRoom.setGuestId(chatRoom.getGuestId() == userId ? -1 : chatRoom.getGuestId());

        if (chatRoom.getHostId() == -1 && chatRoom.getGuestId() == -1) {
            chatRoomRepository.delete(chatRoom);
            chatRepository.deleteAllByDealId(dealId);
        } else {
            chatRoomRepository.save(chatRoom);
        }


    }

    @Override
    @Transactional
    public void dealConfirmed(long dealId) {
        long userId = Long.parseLong(accountUtil.getLoginMemberId());
        ChatRoom chatRoom = chatRoomRepository.findChatRoomByDealId(dealId)
            .orElseThrow(() -> new BusinessException(ErrorCode.CHATROOM_NOT_EXIST));

        Set<Long> confirmedIds = chatRoom.getDealConfirmed();
        confirmedIds.add(userId);
        chatRoom.setDealConfirmed(confirmedIds);
        chatRoomRepository.save(chatRoom);

    }


}

