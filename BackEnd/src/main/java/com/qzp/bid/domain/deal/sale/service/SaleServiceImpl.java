package com.qzp.bid.domain.deal.sale.service;

import com.qzp.bid.domain.deal.sale.dto.SaleReq;
import com.qzp.bid.domain.deal.sale.dto.SaleRes;
import com.qzp.bid.domain.deal.sale.entity.Sale;
import com.qzp.bid.domain.deal.sale.repository.SaleRepository;
import com.qzp.bid.global.result.error.ErrorCode;
import com.qzp.bid.global.result.error.exception.BusinessException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

    @Override
    public SaleRes getSale(Long saleId) {
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.GET_SALE_FAIL));
        return new SaleRes(sale);
    }

    @Override
    public void deleteSale(Long saleId) { // TODO: 권한검사,삭제 시 BID처리 수정 필요 
        saleRepository.deleteById(saleId);
    }
}
