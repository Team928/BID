export interface ISignupReq {
  nickname: string;
  address: string;
}

export interface ISignupRes {
  id: number;
  nickname: string;
  area: string[];
  accessToken: string;
  refreshToken: string;
}

export interface IDaumModalAddr {
  bname: string;
  bname1: string;
  sigungu: string;
  jibunAddress: string;
  address: string;
}

export interface IAddressModalProp {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setInputAddress?: React.Dispatch<React.SetStateAction<string>>;
}
