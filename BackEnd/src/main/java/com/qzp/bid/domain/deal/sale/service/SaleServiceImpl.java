package com.qzp.bid.domain.deal.sale.service;

import static com.qzp.bid.global.result.error.ErrorCode.MEMBER_ID_NOT_EXIST;

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
import com.qzp.bid.global.result.error.ErrorCode;
import com.qzp.bid.global.result.error.exception.BusinessException;
import com.qzp.bid.global.security.util.AccountUtil;
import com.qzp.bid.global.util.ImageUploader;
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

    public void createSale(SaleReq saleReq, List<MultipartFile> photos) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        Sale sale = saleMapper.toSale(saleReq);
        List<ImageDto> uploadPaths = imageUploader.upload(photos);
        sale.setWriter(member);
        List<Image> images = uploadPaths.stream()
            .map(imageMapper::ImageDtoToImage)
            .map(imageRepository::save)
            .toList();
        sale.setImages(images);
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
    public void updateSale(Long saleId, SaleUpdateReq saleUpdateReq) { // TODO: 권한조회 추가 필요
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));
        if (!sale.getStatus().equals(DealStatus.BEFORE)) {
            throw new BusinessException(ErrorCode.UPDATE_SALE_FAIL);
        }
        sale.setImmediatePrice(saleUpdateReq.getImmediatePrice());
    }

    @Override
    public void deleteSale(Long saleId) { // TODO: 권한검사,삭제 시 BID처리 수정 필요
        saleRepository.deleteById(saleId);
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
        if (sale.getHighestBid() != null) {
            sale.getHighestBid().cancelBidding();
        }
        sale.setHighestBid(bid);
    }

    @Override
    public void createLiveReq(Long saleId) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        if (liveRequestRepository.existsBySaleIdAndMemberId(saleId, member.getId())) {
            throw new BusinessException(ErrorCode.ALREADY_REQUESTED);
        }
        LiveRequest liveRequest = LiveRequest.builder().memberId(member.getId())
            .saleId(saleId).build();
        liveRequestRepository.save(liveRequest);
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.SALE_ID_NOT_EXIST));
        sale.setLiveRequestCount(sale.getLiveRequestCount() + 1);
    }
}
