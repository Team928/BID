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
  formId: number;
  finalOfferPrice: number;
}

export interface IRecordReq {
  userId: number;
  dealId: string;
}

export interface ITimeLine {
  step: number;
  dealId: string;
}

export interface IMatchReq {
  dealId: string;
  formId: number;
  offerPrice: number;
}

export interface ISessionRes {
  roomName: string;
  roomNum: number;
  token: string;
}

export interface ITimeStampReq {
  step: number;
  dealId: string;
}

export interface ITimeStamp {
  content: string;
  time: string;
}
