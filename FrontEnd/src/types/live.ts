export interface ISellerInfo {
  type: string;
  userId: number;
  nickName: string;
  offerPrice: number;
  image: string;
  content: string;
  formId: number;
  isRequestSpeak: boolean;
  onMike: boolean;
  possibleSpeak: boolean;
}

export interface IBuyerInfo {
  type: string;
  userId: number;
  nickName: string;
}

export interface IMatchReqInfo {
  dealId: string;
  nickname: string;
  applyFormId: number;
  finalOfferPrice: number;
}
