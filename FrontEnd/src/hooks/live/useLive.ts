import { IMatchReq, matchLive } from '@/service/live/api';
import { useMutation } from '@tanstack/react-query';

export const useLive = () => {
  const usePostLiveMatch = () => {
    return useMutation({
      mutationKey: ['match'],
      mutationFn: ({ dealId, applyFormId, offerPrice }: IMatchReq) => matchLive({ dealId, applyFormId, offerPrice }),
      onSuccess: () => {
        console.log('매칭 성공');
      },
      onError: () => {
        console.log('매칭 실패');
      },
    });
  };

  return { usePostLiveMatch };
};
