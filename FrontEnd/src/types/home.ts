import { categoryType, dealOrderType, dealType } from './model';

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
  immediate_price: number;
  startPrice: number;
  endTime: string;
  bid: number;
  status: dealType;
}

// 판매글 목록 조회 Response ('deals/sales')
export interface ISaleListRes {
  saleSimpleResList: ISaleSimpleRes[];
  last: boolean;
  pageNumber: number;
  pageSize: number;
}

// 판매글 목록 조회 Request ('deals/sales')
export interface ISalesListReq {
  page: string;
  size: string;
  catg?: categoryType;
  area?: string;
  order?: dealOrderType;
  status?: dealType;
  keyword?: string;
}
