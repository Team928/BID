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
