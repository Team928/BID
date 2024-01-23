package com.qzp.bid.domain.deal.sale.controller;

import com.qzp.bid.domain.deal.sale.dto.SaleReq;
import com.qzp.bid.domain.deal.sale.service.SaleService;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/deals/sales")
@RequiredArgsConstructor
public class SaleController {

  private final SaleService saleService;

  @PostMapping
  public ResponseEntity<ResultResponse> createSale(@RequestBody SaleReq saleReq) {
    saleService.createSale(saleReq);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ResultResponse.of(ResultCode.CREATE_SALE_SUCCESS));
  }
}
