package com.qzp.bid.domain.deal.sale.service;

import com.qzp.bid.domain.deal.entity.DealStatus;
import com.qzp.bid.domain.deal.sale.dto.SaleReq;
import com.qzp.bid.domain.deal.sale.dto.SaleRes;
import com.qzp.bid.domain.deal.sale.entity.Sale;
import com.qzp.bid.domain.deal.sale.repository.SaleRepository;
import com.qzp.bid.global.result.error.ErrorCode;
import com.qzp.bid.global.result.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;

    public void createSale(SaleReq saleReq) {
        Sale sale = new Sale(saleReq);
        //sale.setWriter(saleReq.getDealReq().getWriter()); // TODO: 회원기능 구현 후 수정 필요
        saleRepository.save(sale);
    }

    @Transactional(readOnly = true)
    @Override
    public SaleRes getSale(Long saleId) {
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));
        return new SaleRes(sale);
    }

    @Override
    public void updateSale(Long saleId, int immediatePrice) { // TODO: 권한조회 추가 필요
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));
        if(!sale.getStatus().equals(DealStatus.BEFORE))
            throw new BusinessException(ErrorCode.UPDATE_SALE_FAIL);
        sale.setImmediatePrice(immediatePrice);
    }

    @Override
    public void deleteSale(Long saleId) { // TODO: 권한검사,삭제 시 BID처리 수정 필요
        saleRepository.deleteById(saleId);
    }
}
