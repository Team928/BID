package com.qzp.bid.domain.deal.sale.controller;

import com.qzp.bid.domain.deal.dto.SearchParam;
import com.qzp.bid.domain.deal.sale.dto.BidReq;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import com.qzp.bid.domain.deal.sale.dto.SaleReq;
import com.qzp.bid.domain.deal.sale.dto.SaleRes;
import com.qzp.bid.domain.deal.sale.dto.SaleUpdateReq;
import com.qzp.bid.domain.deal.sale.service.SaleService;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/deals/sales")
@RequiredArgsConstructor
@Tag(name = "SaleController", description = "판매/경매 api")
public class SaleController {

    private final SaleService saleService;

    @Operation(summary = "판매글 생성")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResultResponse> createSale(@RequestPart SaleReq saleReq,
        @RequestPart List<MultipartFile> photos) {
        saleService.createSale(saleReq, photos);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ResultResponse.of(ResultCode.CREATE_SALE_SUCCESS));
    }

    @Operation(summary = "판매글 상세조회")
    @GetMapping("/{saleId}")
    public ResponseEntity<ResultResponse> getSale(@PathVariable Long saleId) {
        SaleRes saleRes = saleService.getSale(saleId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.GET_SALE_SUCCESS, saleRes));
    }

    @Operation(summary = "판매글 수정")
    @PatchMapping("/{saleId}")
    public ResponseEntity<ResultResponse> updateSale(@PathVariable Long saleId,
        @RequestBody SaleUpdateReq saleUpdateReq) {
        saleService.updateSale(saleId, saleUpdateReq);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.UPDATE_SALE_SUCCESS));
    }

    @Operation(summary = "판매글 삭제")
    @DeleteMapping("/{saleId}")
    public ResponseEntity<ResultResponse> deleteSale(@PathVariable Long saleId) {
        saleService.deleteSale(saleId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.DELETE_SALE_SUCCESS));
    }

    @Operation(summary = "판매글 목록 조회")
    @GetMapping
    public ResponseEntity<ResultResponse> getSales(
        @ModelAttribute @ParameterObject SearchParam searchParam) {
        SaleListPage saleListPage = saleService.getSales(searchParam);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.GET_SALE_SUCCESS, saleListPage));
    }

    @Operation(summary = "경매 입찰하기")
    @PostMapping("/{saleId}/bids")
    public ResponseEntity<ResultResponse> createBid(@PathVariable Long saleId,
        @RequestBody BidReq bidReq) {
        saleService.createBid(saleId, bidReq);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ResultResponse.of(ResultCode.CREATE_BID_SUCCESS));
    }

    @Operation(summary = "라이브 요청하기")
    @PostMapping("/{saleId}/livereqs")
    public ResponseEntity<ResultResponse> createLiveReq(@PathVariable Long saleId) {
        saleService.createLiveReq(saleId);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ResultResponse.of(ResultCode.CREATE_LIVEREQUEST_SUCCESS));
    }
}
