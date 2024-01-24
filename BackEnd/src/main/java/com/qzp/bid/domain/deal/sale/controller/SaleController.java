package com.qzp.bid.domain.deal.sale.controller;

import com.qzp.bid.domain.deal.sale.dto.SaleReq;
import com.qzp.bid.domain.deal.sale.dto.SaleRes;
import com.qzp.bid.domain.deal.sale.service.SaleService;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/{saleId}")
    public ResponseEntity<ResultResponse> getSale(@PathVariable Long saleId) {
        SaleRes saleRes = saleService.getSale(saleId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.GET_SALE_SUCCESS, saleRes));
    }

    @PatchMapping("/{saleId}")
    public ResponseEntity<ResultResponse> updateSale(@PathVariable Long saleId, @RequestBody int immediatePrice) {
        saleService.updateSale(saleId, immediatePrice);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.UPDATE_SALE_SUCCESS));
    }

    @DeleteMapping("/{saleId}")
    public ResponseEntity<ResultResponse> deleteSale(@PathVariable Long saleId) {
        saleService.deleteSale(saleId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.DELETE_SALE_SUCCESS));
    }
}
