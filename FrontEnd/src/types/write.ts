import { categoryType } from './model';

// 판매글 생성 Request ('deals/sales')
export interface ICreateSaleReq {
  dealReq: ISaleDealReq;
  immediatePrice: number;
  startPrice: number;
  endTime: string;
}

// 구매글 생성 Request ('deals/purchases')
export interface ICreateBuyReq {
  dealReq: ISaleDealReq;
  minPirce: number;
  maxPrice: number;
  memberLimit: number;
}

export interface ISaleDealReq {
  title: string;
  content: string;
  writer: string;
  category: categoryType;
  area: string[];
  startTime: string;
}

// 판매글 input태그 타입
export interface IWriteInput {
  title: string;
  content: string;
  immediatePrice: number;
  startPrice: number;
  date: string;
  time: string;
}

// 구매글 input태그 타입
export interface IBuyWriteInput {
  title: string;
  content: string;
  minPrice: number;
  maxPrice: number;
  date: string;
  time: string;
}

// 카테고리 콤보박스 타입
export interface ICategory {
  id: number;
  name: string;
}
