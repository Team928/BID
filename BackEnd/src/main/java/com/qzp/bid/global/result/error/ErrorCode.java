package com.qzp.bid.global.result.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // Global
    INTERNAL_SERVER_ERROR(500, "내부 서버 오류입니다."),
    METHOD_NOT_ALLOWED(405, "허용되지 않은 HTTP method입니다."),
    INPUT_VALUE_INVALID(400, "유효하지 않은 입력입니다."),
    INPUT_TYPE_INVALID(400, "입력 타입이 유효하지 않습니다."),
    HTTP_MESSAGE_NOT_READABLE(400, "request message body가 없거나, 값 타입이 올바르지 않습니다."),
    HTTP_HEADER_INVALID(400, "request header가 유효하지 않습니다."),
    ENTITY_NOT_FOUNT(500, "존재하지 않는 Entity입니다."),
    FORBIDDEN_ERROR(403, "작업을 수행하기 위한 권한이 없습니다."),
    IS_NOT_IMAGE(400, "이미지가 아닙니다."),

    //deal
    DEAL_ID_NOT_EXIST(400, "거래 id가 존재하지 않습니다."),
    WISH_ALREADY_EXIST(400, "이미 찜한 거래입니다."),
    WISH_NOT_EXIST(400, "찜한 거래가 존재하지 않습니다."),

    // sale
    SALE_ID_NOT_EXIST(400, "존재하지 않는 판매글 ID입니다."),
    GET_SALE_FAIL(400, "판매글 조회에 실패하였습니다."),
    UPDATE_SALE_FAIL(400, "판매글 수정에 실패하였습니다."),
    BID_PRICE_TOO_LOW(400, "입찰가가 낮습니다."),
    BID_FAIL(400, "입찰에 실패하였습니다."),
    ALREADY_REQUESTED(400, "이미 요청한 경매글입니다."),

    //purchase
    GET_PURCHASE_FAIL(400, "구매글 조회에 실패하였습니다."),
    APPLY_LIMIT_FAIL(400, "지원 인원이 모두 찼습니다."),
    PURCHASE_IS_NOT_BEFORE(400, "역경매 참여 신청 가능한 상태가 아닙니다."),

    //JWT
    JWT_INVALID(401, "유효하지 않은 토큰입니다."),
    JWT_BADTYPE(401, "Bearer 타입 토큰이 아닙니다."),
    JWT_EXPIRED(403, "만료된 토큰입니다."),
    JWT_MALFORM(401, "토큰값이 올바르지 않습니다."),
    BLACK_TOKEN(401, "접근이 차단된 토큰입니다."),
    TOKEN_ALIVE(400, "유효기간이 만료되지 않은 토큰입니다."),
    REFRESH_INVALID(400, "리프레시 토큰이 유효하지 않습니다."),

    //Member
    MEMBER_ID_NOT_EXIST(400, "회원 id가 존재하지 않습니다."),
    REGISTER_FAIL(400, "회원가입에 실패하였습니다."),

    //Chat
    EXIT_CHATROOM_FAIL(400, "거래가 확정되지 않았습니다.")
    ;

    private final int status;
    private final String message;

}