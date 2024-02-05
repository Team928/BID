import { categoryType } from './model';

// 판매글 생성 Request ('deals/sales')
export interface ICreateSaleReq {
  dealReq: ISaleDealReq;
  immediatePrice: number;
  startPrice: number;
  endTime: string;
}

export interface ISaleDealReq {
  title: string;
  content: string;
  writer: string;
  category: categoryType;
  area: string[];
  startTime: string;
}

// input태그 타입
export interface IWriteInput {
  title: string;
  content: string;
  immediatePrice: number;
  startPrice: number;
  date: string;
  time: string;
}

// 카테고리 콤보박스 타입
export interface ICategory {
  id: number;
  name: string;
}
