import { dealStatusType } from '@/types/model';

export const getPriceName = (status: dealStatusType) => {
  let name = '';
  switch (status) {
    case 'AUCTION':
      name = '현재 입찰가';
      break;
    case 'BEFORE':
      name = '즉시 구매가';
      break;
    case 'END':
      name = '최종 입찰가';
      break;
    case 'LIVE':
      name = '현재 입찰가';
      break;
  }

  return name;
};
