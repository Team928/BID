package com.qzp.bid.domain.deal.purchase.controller;

import com.qzp.bid.domain.deal.purchase.dto.PurchaseReq;
import com.qzp.bid.domain.deal.purchase.dto.PurchaseRes;
import com.qzp.bid.domain.deal.purchase.service.PurchaseService;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/deals/purchases")
@RequiredArgsConstructor
@Tag(name = "PurchaseController", description = "구매/역경매 api")
public class PurchaseController {

    private final PurchaseService purchaseService;

    @Operation(summary = "구매글 생성")
    @PostMapping
    public ResponseEntity<ResultResponse> createPurchase(@RequestBody PurchaseReq purchaseReq) {
        purchaseService.createPurchase(purchaseReq);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ResultResponse.of(ResultCode.CREATE_PURCHASE_SUCCESS));
    }

    @Operation(summary = "구매글 상세조회")
    @GetMapping("/{purchaseId}")
    public ResponseEntity<ResultResponse> getPurchase(@PathVariable Long purchaseId) {
        PurchaseRes purchaseRes = purchaseService.getPurchase(purchaseId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.GET_PURCHASE_SUCCESS, purchaseRes));
    }
}
