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
  isWished?: boolean;
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
  status: dealStatusType;
  isWished: boolean;
}

// 나의 역경매 Response
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

// 프로필 수정
export interface IChangeProfile {
  nickname: string;
  area: string[];
}

// 포인트 사용 내역
export interface IUserPointHistoryRes {
  pointHistorySimpleResList: IPointHistoryInfo[];
  pageNumber: number;
  pageSize: number;
  last: boolean;
}

export interface IPointHistoryInfo {
  time: string;
  amount: number;
  status: 'HOLD' | 'FREE' | 'CHARGE';
}
