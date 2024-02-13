package com.qzp.bid.domain.deal.sale.service;

import static com.qzp.bid.global.result.error.ErrorCode.MEMBER_ID_NOT_EXIST;

import com.qzp.bid.domain.chat.dto.LiveResultReq;
import com.qzp.bid.domain.chat.service.ChatService;
import com.qzp.bid.domain.deal.dto.ImageDto;
import com.qzp.bid.domain.deal.dto.SearchParam;
import com.qzp.bid.domain.deal.entity.DealStatus;
import com.qzp.bid.domain.deal.entity.Image;
import com.qzp.bid.domain.deal.mapper.ImageMapper;
import com.qzp.bid.domain.deal.repository.ImageRepository;
import com.qzp.bid.domain.deal.repository.WishRepository;
import com.qzp.bid.domain.deal.sale.dto.BidReq;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import com.qzp.bid.domain.deal.sale.dto.SaleReq;
import com.qzp.bid.domain.deal.sale.dto.SaleRes;
import com.qzp.bid.domain.deal.sale.dto.SaleUpdateReq;
import com.qzp.bid.domain.deal.sale.entity.Bid;
import com.qzp.bid.domain.deal.sale.entity.LiveRequest;
import com.qzp.bid.domain.deal.sale.entity.Sale;
import com.qzp.bid.domain.deal.sale.mapper.BidMapper;
import com.qzp.bid.domain.deal.sale.mapper.SaleMapper;
import com.qzp.bid.domain.deal.sale.repository.BidRepository;
import com.qzp.bid.domain.deal.sale.repository.LiveRequestRepository;
import com.qzp.bid.domain.deal.sale.repository.SaleRepository;
import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.domain.member.entity.PointHistory;
import com.qzp.bid.domain.member.entity.PointStatus;
import com.qzp.bid.domain.member.repository.PointHistoryRepository;
import com.qzp.bid.domain.sse.dto.SseDto;
import com.qzp.bid.domain.sse.dto.SseType;
import com.qzp.bid.domain.sse.service.SseService;
import com.qzp.bid.global.result.error.ErrorCode;
import com.qzp.bid.global.result.error.exception.BusinessException;
import com.qzp.bid.global.security.util.AccountUtil;
import com.qzp.bid.global.util.ImageUploader;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;
    private final SaleMapper saleMapper;
    private final ImageMapper imageMapper;
    private final AccountUtil accountUtil;
    private final ImageUploader imageUploader;
    private final ImageRepository imageRepository;
    private final BidRepository bidRepository;
    private final BidMapper bidMapper;
    private final LiveRequestRepository liveRequestRepository;
    private final WishRepository wishRepository;
    private final PointHistoryRepository pointHistoryRepository;
    private final SseService sseService;
    private final ChatService chatService;

    public void createSale(SaleReq saleReq, List<MultipartFile> photos) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        Sale sale = saleMapper.toSale(saleReq);
        List<ImageDto> uploadPaths = imageUploader.upload(photos);
        sale.setWriter(member);
        List<Image> images = uploadPaths.stream()
            .map(imageDto -> {
                Image image = imageMapper.imageDtoToImage(imageDto);
                image.setDeal(sale);
                return image;
            })
            .map(imageRepository::save)
            .toList();
        sale.setImages(images);
        sale.setBidCount(0);
        saleRepository.save(sale);
    }

    @Transactional(readOnly = true)
    @Override
    public SaleRes getSale(Long saleId) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));
        Optional<List<Bid>> bids = bidRepository.findBySaleId(saleId);
        SaleRes saleRes = saleMapper.toSaleRes(sale);
        bids.ifPresent(
            bidList -> saleRes.setBidList(
                bidList.stream().map(bidMapper::BidToBidRes).collect(Collectors.toList())));
        if (liveRequestRepository.existsBySaleIdAndMemberId(saleId, member.getId())) {
            saleRes.setLiveReq(true);
        }
        if (wishRepository.existsByDealIdAndMemberId(saleId, member.getId())) {
            saleRes.setWished(true);
        }
        return saleRes;
    }

    @Override
    public void updateSale(Long saleId, SaleUpdateReq saleUpdateReq) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));
        if (sale.getWriter().getId() != member.getId()) {
            throw new BusinessException(ErrorCode.FORBIDDEN_ERROR);
        }
        if (!sale.getStatus().equals(DealStatus.BEFORE)) {
            throw new BusinessException(ErrorCode.NOT_BEFORE_STATUS);
        }
        sale.setImmediatePrice(saleUpdateReq.getImmediatePrice());
    }

    @Override
    public void deleteSale(Long saleId) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));
        if (sale.getWriter().getId() != member.getId()) {
            throw new BusinessException(ErrorCode.FORBIDDEN_ERROR);
        }
        if (!sale.getStatus().equals(DealStatus.BEFORE)) {
            throw new BusinessException(ErrorCode.NOT_BEFORE_STATUS);
        }
        saleRepository.delete(sale);
    }

    @Transactional(readOnly = true)
    @Override
    public SaleListPage getSales(SearchParam searchParam) {
        return saleRepository.getSaleListPageBySearchParam(searchParam);
    }

    @Override
    public void createBid(Long saleId, BidReq bidReq) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.SALE_ID_NOT_EXIST));
        if (sale.getStatus() != DealStatus.AUCTION && sale.getStatus() != DealStatus.LIVE) {
            throw new BusinessException(ErrorCode.NOT_AUCTION_STATUS);
        }
        if (sale.getHighestBid() != null
            && sale.getHighestBid().getBidPrice() >= bidReq.getBidPrice()) {
            throw new BusinessException(ErrorCode.BID_PRICE_TOO_LOW);
        }
        Bid bid = Bid.builder().bidder(member).bidPrice(bidReq.getBidPrice()).isSuccess(false)
            .sale(sale).build();
        if (!bid.bidding()) {
            throw new BusinessException(ErrorCode.NOT_ENOUGH_POINT);
        }
        bidRepository.save(bid);
        PointHistory hold = PointHistory.builder()
            .amount(bid.getBidPrice())
            .status(PointStatus.HOLD)
            .time(bid.getBidTime())
            .member(member)
            .build();
        pointHistoryRepository.save(hold);
        if (sale.getHighestBid() != null) {
            Bid highestBid = sale.getHighestBid();
            highestBid.cancelBidding();
            //상위 입찰 등장 푸시알람
            sseService.send(
                SseDto.of(highestBid.getBidder().getId(), saleId, "sale", SseType.CANCEL_BID,
                    LocalDateTime.now()));

            PointHistory free = PointHistory.builder()
                .amount(highestBid.getBidPrice())
                .status(PointStatus.FREE)
                .time(bid.getBidTime())
                .member(member)
                .build();
            pointHistoryRepository.save(free);
        }
        sale.setHighestBid(bid);
        sale.setBidCount(sale.getBidCount() + 1);
    }

    @Override
    public void createLiveReq(Long saleId) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        if (liveRequestRepository.existsBySaleIdAndMemberId(saleId, member.getId())) {
            throw new BusinessException(ErrorCode.ALREADY_REQUESTED);
        }
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.SALE_ID_NOT_EXIST));
        if (!sale.getStatus().equals(DealStatus.AUCTION)) {
            throw new BusinessException(ErrorCode.NOT_AUCTION_STATUS);
        }
        LiveRequest liveRequest = LiveRequest.builder().memberId(member.getId())
            .saleId(saleId).build();
        liveRequestRepository.save(liveRequest);
        sale.setLiveRequestCount(sale.getLiveRequestCount() + 1);
    }

    @Override
    public void saleClosing() {
        Optional<List<Sale>> sales = saleRepository.findByStatusIsNot(DealStatus.END);
        if (sales.isEmpty()) {
            return;
        }
        for (Sale sale : sales.get()) {
            log.info(sale.getEndTime().toString());
            log.info(LocalDateTime.now().toString());
            if (sale.getEndTime().isAfter(LocalDateTime.now())) {
                continue;
            }
            sale.setStatus(DealStatus.END);
            Bid highestBid = sale.getHighestBid();
            if (highestBid != null) {
                highestBid.setSuccess(true);

                sseService.send(
                    SseDto.of(highestBid.getBidder().getId(), sale.getId(), "sale",
                        SseType.SUCCESS_BID,
                        LocalDateTime.now()));
            }
            //TODO: 구매자 판매자 채팅방 생성
        }
    }

    @Override
    public void immediateBuy(Long saleId) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.SALE_ID_NOT_EXIST));

        if (sale.getStatus() != DealStatus.BEFORE) {
            throw new BusinessException(ErrorCode.NOT_BEFORE_STATUS);
        }
        if (!member.bidding(sale.getImmediatePrice())) {
            throw new BusinessException(ErrorCode.NOT_ENOUGH_POINT);
        }
        PointHistory hold = PointHistory.builder()
            .amount(sale.getImmediatePrice())
            .status(PointStatus.HOLD)
            .time(LocalDateTime.now())
            .member(member)
            .build();
        pointHistoryRepository.save(hold);
        sale.setStatus(DealStatus.END);

        Bid bid = Bid.builder().sale(sale).bidder(member).bidPrice(sale.getImmediatePrice())
            .isSuccess(true).build();

        bidRepository.save(bid);

        chatService.createRoom(LiveResultReq.builder().dealId(saleId).build());
    }
}
