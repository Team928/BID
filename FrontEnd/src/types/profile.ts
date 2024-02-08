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

// 나의 경매 Response 
export interface ISaleListRes {
    saleSimpleResList: ISaleSimpleRes[];
    last: boolean;
    pageNumber: number;
    pageSize: number;
  }

  export interface IBuySimpleRes {
    dealSimpleRes: IDealSimpleRes;
    immediatePrice: number;
    startPrice: number;
    endTime: string;
    bid: number;
    status: dealStatusType;
    isWished: boolean

  }

  // 내가 주최한 역경매 Response
  export interface IbuyListRes {
    purchaseSimpleRes: IBuySimpleRes[];
    last: boolean;
    pagrNumber: number;
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