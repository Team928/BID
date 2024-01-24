package com.qzp.bid.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {
    // Member
    REGISTER_SUCCESS(201, "회원가입에 성공하였습니다."),

    //sale
    CREATE_SALE_SUCCESS(201, "판매글 생성에 성공하였습니다."),
    GET_SALE_SUCCESS(200, "판매글 조회에 성공하였습니다."),
    UPDATE_SALE_SUCCESS(200, "판매글 수정에 성공하였습니다."),;


    private final int status;
    private final String message;
}
