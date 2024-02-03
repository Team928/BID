export interface ISignupReq {
  nickname: string;
  address: string;
}

export interface ISignupRes {
  id: number;
  nickname: string;
  address: string;
  accessToken: string;
  refreshToken: string;
}
