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
  isWished: boolean;
}

export interface IDealRes {
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

export interface IBidInfo {
  id: number;
  bidPrice: number;
  bidTime: string;
  bidder: string;
}

// 판매글 목록 조회 Response ('deals/sales')
export interface ISaleListRes {
  saleSimpleResList: ISaleSimpleRes[];
  last: boolean;
  pageNumber: number;
  pageSize: number;
}

// 판매글, 구매글 목록 조회 Request ('deals/sales', 'deals/purchase')
export interface IDealsListReq {
  page: string;
  size: string;
  catg?: categoryType;
  area?: string;
  order?: dealOrderType;
  status?: dealStatusType;
  keyword?: string;
}

// 무한스크롤
export interface IDealsListInfiniteReq {
  size: string;
  catg?: categoryType;
  area?: string;
  order?: dealOrderType;
  status?: dealStatusType;
  keyword?: string;
}

// 판매글 상세 조회 Response ('deals/sales/{saleID}')
export interface ISaleDetailRes {
  dealRes: IDealRes;
  immediatePrice: number;
  startPrice: number;
  highestBid: number;
  endTime: string;
  status: dealStatusType;
  liveRequestCount: number;
  bidList: IBidInfo[];
  liveReq: boolean;
  isWished: false;
}

// 구매글 목록 조회 Response ('deals/purchase')
export interface IPurchaseListRes {
  purchaseSimpleRes: IPurchaseSimpleRes[];
  last: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface IPurchaseSimpleRes {
  dealSimpleRes: IDealSimpleRes;
}

// 구매글 상세 조회 Response ('deals/purchases/{purchaseId}')
export interface IPurchaseDetailRes {
  dealRes: IDealRes;
  minPrice: number;
  maxPrice: number;
  memberLimit: number;
  status: dealStatusType;
  applyForms: IApplyForms[];
  isWished: boolean;
  joinReq: boolean;
}

export interface IApplyForms {
  content: string;
  id: number;
  image: string;
  offerPrice: number;
  sellerId: number;
  sellerNickname: string;
}
