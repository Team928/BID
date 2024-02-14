// 리뷰 생성 Req
export interface ICreateReviewReq {
  dealId: number;
  targetNickname: string;
  score: number;
  content: string;
}

export interface IReviewSimpleRes {
  id: number;
  reviewerNickname: string;
  tergetNickname: string;
  content: string;
  score: number;
  createTime: string;
  role: 'SELLER' | 'BUYER';
}

// 리뷰 조회 Res
export interface IReviewListReq {
  reviewSimpleRes: IReviewSimpleRes[];
  pageNumber: number;
  pageSize: number;
  last: boolean;
  total: number;
}
