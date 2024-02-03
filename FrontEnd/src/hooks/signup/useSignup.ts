import { getMemberNicknameCheck, postSignup } from '@/service/signup/api';
import { ISignupReq } from '@/types/signup';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useSignup = () => {
  const useGetNicknameCheck = (props: { nickname: string; isClick: boolean }) => {
    return useQuery({
      queryKey: ['signup', 'nickname', 'doubleCheck', props],
      queryFn: () => getMemberNicknameCheck(props.nickname),
      enabled: props.isClick,
    });
  };

  const usePostSignup = (info: ISignupReq) => {
    return useMutation({
      mutationFn: () => postSignup(info),
    });
  };

  return { useGetNicknameCheck, usePostSignup };
};
