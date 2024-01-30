package com.qzp.bid.domain.deal.purchase.service;

import static com.qzp.bid.global.result.error.ErrorCode.GET_PURCHASE_FAIL;
import static com.qzp.bid.global.result.error.ErrorCode.MEMBER_ID_NOT_EXIST;

import com.qzp.bid.domain.deal.dto.ImageDto;
import com.qzp.bid.domain.deal.dto.SearchParam;
import com.qzp.bid.domain.deal.entity.Image;
import com.qzp.bid.domain.deal.mapper.ImageMapper;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseListPage;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseReq;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseRes;
import com.qzp.bid.domain.deal.purchase.entity.Purchase;
import com.qzp.bid.domain.deal.purchase.mapper.PurchaseMapper;
import com.qzp.bid.domain.deal.purchase.repository.PurchaseRepository;
import com.qzp.bid.domain.deal.repository.ImageRepository;
import com.qzp.bid.domain.member.entity.Member;
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
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final PurchaseMapper purchaseMapper;
    private final ImageMapper imageMapper;
    private final AccountUtil accountUtil;
    private final ImageUploader imageUploader;
    private final ImageRepository imageRepository;

    @Override
    public void createPurchase(PurchaseReq purchaseReq, List<MultipartFile> photos) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        Purchase purchase = purchaseMapper.toPurchase(purchaseReq);
        List<ImageDto> uploadPaths = imageUploader.upload(photos);
        purchase.setWriter(member);
        List<Image> images = uploadPaths.stream()
            .map(imageMapper::ImageDtoToImage)
            .map(imageRepository::save)
            .toList();
        purchase.setImages(images);
        purchaseRepository.save(purchase);
    }

    @Override
    public PurchaseRes getPurchase(Long purchaseId) {
        Purchase purchase = purchaseRepository.findById(purchaseId)
            .orElseThrow(() -> new BusinessException(GET_PURCHASE_FAIL));
        return purchaseMapper.toPurchaseRes(purchase);
    }

    @Override
    public void deletePurchase(Long purchaseId) {
        purchaseRepository.deleteById(purchaseId);
    }

    @Override
    public PurchaseListPage getPurchases(SearchParam searchParam) {
        return purchaseRepository.getPurchaseListPageBySearchParam(searchParam);
    }
}
