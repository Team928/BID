import { dealType } from '@/components/@common/StateButton';

export interface INotifyInfo {
  dealId: number;
  event: string;
  memberId: number;
  message: string;
  time: string;
  type: string;
  dealType: dealType;
}
