import { categoryType, dealOrderType, dealStatusType } from './model';

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
  status?: dealStatusType;
  keyword?: string;
}

// 판매글 상세 조회 Response ('deals/sales/{saleID}')
export interface ISaleDetailRes {
  dealRes: dealResType;
  immediatePrice: number;
  startPrice: number;
  highestBid: number;
  endTime: string;
  status: dealStatusType;
  liveRequestCount: number;
  bidList: [];
  liveReq: boolean;
  wished: false;
}

export interface dealResType {
  id: number;
  title: string;
  content: string;
  writer: string;
  category: categoryType;
  area: string[];
  createTime: string;
  updateTime: string;
  images: string[];
  startTime: string;
}
