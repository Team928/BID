package com.qzp.bid.domain.deal.purchase.service;

import static com.qzp.bid.global.result.error.ErrorCode.APPLY_LIMIT_FAIL;
import static com.qzp.bid.global.result.error.ErrorCode.GET_PURCHASE_FAIL;
import static com.qzp.bid.global.result.error.ErrorCode.MEMBER_ID_NOT_EXIST;
import static com.qzp.bid.global.result.error.ErrorCode.PURCHASE_IS_NOT_BEFORE;

import com.qzp.bid.domain.deal.dto.ImageDto;
import com.qzp.bid.domain.deal.dto.SearchParam;
import com.qzp.bid.domain.deal.entity.DealStatus;
import com.qzp.bid.domain.deal.entity.Image;
import com.qzp.bid.domain.deal.mapper.ImageMapper;
import com.qzp.bid.domain.deal.purchase.dto.ApplyFormReq;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseListPage;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseReq;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseRes;
import com.qzp.bid.domain.deal.purchase.entity.ApplyForm;
import com.qzp.bid.domain.deal.purchase.entity.Purchase;
import com.qzp.bid.domain.deal.purchase.mapper.ApplyFormMapper;
import com.qzp.bid.domain.deal.purchase.mapper.PurchaseMapper;
import com.qzp.bid.domain.deal.purchase.repository.ApplyFormRepository;
import com.qzp.bid.domain.deal.purchase.repository.PurchaseRepository;
import com.qzp.bid.domain.deal.repository.ImageRepository;
import com.qzp.bid.domain.deal.repository.WishRepository;
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
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final PurchaseMapper purchaseMapper;
    private final ImageMapper imageMapper;
    private final AccountUtil accountUtil;
    private final ImageUploader imageUploader;
    private final ImageRepository imageRepository;
    private final ApplyFormRepository applyFormRepository;
    private final ApplyFormMapper applyFormMapper;
    private final WishRepository wishRepository;

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

    @Transactional(readOnly = true)
    @Override
    public PurchaseRes getPurchase(Long purchaseId) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        Purchase purchase = purchaseRepository.findById(purchaseId)
            .orElseThrow(() -> new BusinessException(GET_PURCHASE_FAIL));
        PurchaseRes purchaseRes = purchaseMapper.toPurchaseRes(purchase);
        if (purchase.getApplyForms().stream()
            .anyMatch(applyForm -> applyForm.getSellerId() == member.getId())) {
            purchaseRes.setJoinReq(true);
        }
        if (wishRepository.existsByDealIdAndMemberId(purchaseId, member.getId())) {
            purchaseRes.setWished(true);
        }
        return purchaseRes;
    }

    @Override
    public void deletePurchase(Long purchaseId) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        Purchase purchase = purchaseRepository.findById(purchaseId)
            .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));
        if (purchase.getWriter().getId() != member.getId()) {
            throw new BusinessException(ErrorCode.FORBIDDEN_ERROR);
        }
        purchaseRepository.delete(purchase);
    }

    @Transactional(readOnly = true)
    @Override
    public PurchaseListPage getPurchases(SearchParam searchParam) {
        return purchaseRepository.getPurchaseListPageBySearchParam(searchParam);
    }

    @Override
    public void createApplyForm(Long purchasesId, ApplyFormReq applyFormReq, MultipartFile image) {
        Member member = accountUtil.getLoginMember()
            .orElseThrow(() -> new BusinessException(MEMBER_ID_NOT_EXIST));
        Purchase purchase = purchaseRepository.findById(purchasesId)
            .orElseThrow(() -> new BusinessException(GET_PURCHASE_FAIL));
        if (purchase.getApplyForms().size() >= purchase.getMemberLimit()) {
            throw new BusinessException(APPLY_LIMIT_FAIL);
        }
        if (purchase.getStatus() != DealStatus.BEFORE) {
            throw new BusinessException(PURCHASE_IS_NOT_BEFORE);
        }

        ApplyForm applyForm = applyFormMapper.applyFormToApplyFormReq(applyFormReq);
        ImageDto imageDto = imageUploader.uploadOne(image);
        applyForm.setSellerId(member.getId());
        applyForm.setImage(imageDto.getImagePath());
        applyFormRepository.save(applyForm);

        List<ApplyForm> applyForms = purchase.getApplyForms();
        applyForms.add(applyForm);
        purchase.setApplyForms(applyForms);
    }
}
