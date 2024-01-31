export type categoryType =
  | 'ALL'
  | 'FASHION'
  | 'BEAUTY'
  | 'CHILD'
  | 'LIVING'
  | 'DIGITAL'
  | 'BOOK'
  | 'TOY'
  | 'PET'
  | 'ETC';

// 경매의 경우 아래와 같이 4개
// 역경매의 경우 AUCTION이 빠진 3개
export type dealStatusType = 'BEFORE' | 'LIVE' | 'AUCTION' | 'END';

// desc -> 최신순
// asc -> 시작임박 or 마감임박
export type dealOrderType = 'desc' | 'asc';

export interface APIResponse<T> {
  status: number;
  message: string;
  data: T;
}
