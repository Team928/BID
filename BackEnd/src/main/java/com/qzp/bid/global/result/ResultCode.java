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
    GET_MYPAGE_SUCCESS(200, "마이페이지 조회에 성공하였습니다"),

    //deal
    ADD_WISH_SUCCESS(201, "거래글 찜목록 추가에 성공하였습니다."),
    DELETE_WISH_SUCCESS(200, "거래글 찜목록 삭제에 성공하였습니다."),

    //sale
    CREATE_SALE_SUCCESS(201, "판매글 생성에 성공하였습니다."),
    GET_SALE_SUCCESS(200, "판매글 조회에 성공하였습니다."),
    UPDATE_SALE_SUCCESS(200, "판매글 수정에 성공하였습니다."),
    DELETE_SALE_SUCCESS(200, "판매글 삭제에 성공하였습니다."),
    CREATE_BID_SUCCESS(201, "입찰에 성공하였습니다."),
    CREATE_LIVEREQUEST_SUCCESS(201, "라이브 요청에 성공하였습니다."),

    //purchase
    CREATE_PURCHASE_SUCCESS(201, "구매글 생성에 성공하였습니다."),
    GET_PURCHASE_SUCCESS(200, "구매글 조회에 성공하였습니다."),
    DELETE_PURCHASE_SUCCESS(200, "구매글 삭제에 성공하였습니다."),
    CREATE_APPLYFORM_SUCCESS(200, "역경매 참가 신청에 성공하였습니다."),

    //chat
    CREATE_CHAT_SUCCESS(201, "채팅 생성에 성공하였습니다."),
    GET_CHATROOMS_SUCCESS(200, "채팅방 조회에 성공하였습니다."),
    GET_CHATS_SUCCESS(200, "채팅내역 조회에 성공하였습니다."),
    EXIT_CHATROOM_SUCCESS(204, "채팅방 나가기에 성공하였습니다."),
    CONFIRMED_DEAL_SUCCESS(200, "거래확정에 성공하였습니다.")
    ;


    private final int status;
    private final String message;
}
