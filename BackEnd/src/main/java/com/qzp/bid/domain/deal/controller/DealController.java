package com.qzp.bid.domain.deal.controller;

import com.qzp.bid.domain.deal.service.DealService;
import com.qzp.bid.global.result.ResultCode;
import com.qzp.bid.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/deals")
@RequiredArgsConstructor
@Tag(name = "DealController", description = "거래 공통 api")
public class DealController {

    private final DealService dealService;

    @Operation(summary = "거래글 찜목록 추가")
    @PostMapping("/wishes")
    public ResponseEntity<ResultResponse> addWish(@RequestParam long dealId) {
        dealService.addWish(dealId);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ResultResponse.of(ResultCode.ADD_WISH_SUCCESS));
    }

    @Operation(summary = "거래글 찜목록 제거")
    @DeleteMapping("/wishes/{dealId}")
    public ResponseEntity<ResultResponse> deleteWish(@PathVariable long dealId) {
        dealService.deleteWish(dealId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.DELETE_WISH_SUCCESS));
    }
}
