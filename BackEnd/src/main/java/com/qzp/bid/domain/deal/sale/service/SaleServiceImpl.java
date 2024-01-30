package com.qzp.bid.domain.deal.sale.service;

import static com.qzp.bid.global.result.error.ErrorCode.MEMBER_ID_NOT_EXIST;

import com.qzp.bid.domain.deal.dto.ImageDto;
import com.qzp.bid.domain.deal.dto.SearchParam;
import com.qzp.bid.domain.deal.entity.DealStatus;
import com.qzp.bid.domain.deal.entity.Image;
import com.qzp.bid.domain.deal.mapper.ImageMapper;
import com.qzp.bid.domain.deal.repository.ImageRepository;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import com.qzp.bid.domain.deal.sale.dto.SaleReq;
import com.qzp.bid.domain.deal.sale.dto.SaleRes;
import com.qzp.bid.domain.deal.sale.dto.SaleUpdateReq;
import com.qzp.bid.domain.deal.sale.entity.Sale;
import com.qzp.bid.domain.deal.sale.mapper.SaleMapper;
import com.qzp.bid.domain.deal.sale.repository.SaleRepository;
import com.qzp.bid.domain.member.entity.Member;
import com.qzp.bid.global.result.error.ErrorCode;
import com.qzp.bid.global.result.error.exception.BusinessException;
import com.qzp.bid.global.security.util.AccountUtil;
import com.qzp.bid.global.util.ImageUploader;
import java.util.List;
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
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));
        return saleMapper.toSaleRes(sale);
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

    @Override
    public SaleListPage getSales(SearchParam searchParam) {
        return saleRepository.getSaleListPageBySearchParam(searchParam);
    }
}
