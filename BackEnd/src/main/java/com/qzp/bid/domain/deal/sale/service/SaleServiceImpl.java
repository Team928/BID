package com.qzp.bid.domain.deal.sale.service;

import com.qzp.bid.domain.deal.sale.dto.SaleReq;
import com.qzp.bid.domain.deal.sale.entity.Sale;
import com.qzp.bid.domain.deal.sale.repository.SaleRepository;
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
}
