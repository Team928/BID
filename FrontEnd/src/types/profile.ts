import { categoryType, dealStatusType } from './model';

export interface IDealSimpleRes {
    id: number;
    title: string;
    content: string;
    category: categoryType;
    createTime: string;
    startTime: string;
    image: string;
  }
  
  export interface ISaleSimpleRes {
    dealSimpleRes: IDealSimpleRes;
    immediatePrice: number;
    startPrice: number;
    endTime: string;
    bid: number;
    status: dealStatusType;
    isWished: boolean
  }

// 판매글 목록 조회 Response ('members/review')
export interface ISaleListRes {
    saleSimpleResList: ISaleSimpleRes[];
    last: boolean;
    pageNumber: number;
    pageSize: number;
  }

// 프로필 조회
  export interface IUserProfile {
    nickname: string;
    email: string;
    point: number;
    profileImage: string | null;
    score: number;
  }