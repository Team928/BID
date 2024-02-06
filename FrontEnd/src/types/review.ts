// 리뷰 생성 Req
export interface ICreateReviewReq {
    dealId: number;
    targetNickname: string;
    score: number;
    content: string;
}

