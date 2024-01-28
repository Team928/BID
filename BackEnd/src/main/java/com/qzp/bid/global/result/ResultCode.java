package com.qzp.bid.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {
    // Member
    REGISTER_SUCCESS(201, "회원가입에 성공하였습니다."),
    LOGIN_SUCCESS(200, "로그인에 성공하였습니다."),
    NICKNAME_DO_EXIST(200, "사용 불가능한 닉네임 입니다."),
    NICKNAME_DO_NOT_EXIST(200, "사용 가능한 닉네임 입니다."),

    //sale
    CREATE_SALE_SUCCESS(201, "판매글 생성에 성공하였습니다."),
    GET_SALE_SUCCESS(200, "판매글 조회에 성공하였습니다."),
    UPDATE_SALE_SUCCESS(200, "판매글 수정에 성공하였습니다."),
    DELETE_SALE_SUCCESS(200, "판매글 삭제에 성공하였습니다."),

    //purchase
    CREATE_PURCHASE_SUCCESS(201, "구매글 생성에 성공하였습니다."),
    GET_PURCHASE_SUCCESS(200, "구매글 조회에 성공하였습니다.");


    private final int status;
    private final String message;
}
