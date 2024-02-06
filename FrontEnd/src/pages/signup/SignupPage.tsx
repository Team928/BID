import DaumPostModal from '@/components/@common/DaumPostModal';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import { useSignup } from '@/hooks/signup/useSignup';
import userStore from '@/stores/userStore';
import { ISignupReq } from '@/types/signup';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const { useGetNicknameCheck, usePostSignup } = useSignup();
  const { loginUser } = userStore();
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [inputAddress, setInputAddress] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const info: IHeaderInfo = {
    left: null,
    center: '회원가입',
    right_1: null,
    right_2: null,
    prev: '/',
  };

  const { data: check } = useGetNicknameCheck({ nickname: nickname, isClick: isClick });
  const { mutate, isSuccess, data } = usePostSignup({ address: address, nickname: nickname });

  // input 상태 관리
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isClick) setIsClick(false);
    setNickname(e.target.value);
  };

  // 중복확인
  const nicknameDoubleCheck = () => {
    if (nickname) {
      setIsClick(true);
    }
  };

  // 회원가입 진행
  const handleSignup = () => {
    if (confirmSignup({ address, nickname })) {
      mutate();
    } else {
      // #TODO 토스트 메시지 띄우기
      console.log('지금은 회원가입 못해');
    }
  };

  // 회원가입 유효성 검사
  const confirmSignup = (info: ISignupReq): boolean => {
    if (info && info.nickname && info.address && check) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (isSuccess) {
      const { accessToken, area, id, nickname, refreshToken } = data.data;
      loginUser({
        accessToken: accessToken,
        area: area[0],
        nickname: nickname,
        refreshToken: refreshToken,
        userId: id,
      });
      navigate('/');
      // #TODO 토스트 메시지 띄우기
    }
  }, [isSuccess]);

  return (
    <>
      {isOpen && <DaumPostModal setIsOpen={setIsOpen} setInputAddress={setInputAddress} setAddress={setAddress} />}
      <div className="w-full h-screen">
        <Header info={info} />
        <div className="pt-12 w-full h-full px-BID_P ">
          <div className="w-full  pt-8">
            <p className="text-lg font-bold">별명</p>
            <div className="flex justify-between w-full gap-5 py-1">
              <input
                type="text"
                value={nickname}
                onChange={handleInputChange}
                placeholder="사용할 별명을 입력해주세요"
                className="w-full outline-none border-b p-1 px-2"
              />
              <div
                onClick={nicknameDoubleCheck}
                className="whitespace-nowrap flex justify-center items-center p-2 text-sm  bg-BID_BLACK text-white rounded-lg"
              >
                중복 확인
              </div>
            </div>
          </div>
          <div className="px-2 py-1 h-5">
            {!check ? (
              <></>
            ) : check.data ? (
              <p className="text-blue-400">{check.message}</p>
            ) : (
              <p className="text-red-400">{check.message}</p>
            )}
          </div>

          <div className="pt-8 ">
            <p className="text-lg font-bold pb-2">주소</p>
            <p onClick={() => setIsOpen(true)} className="w-full border-b p-2 text-gray-400 ">
              건물, 지번 또는 도로명 검색하기
            </p>
            <div className="pt-2">
              <input
                type="text"
                placeholder="기본 주소"
                readOnly
                className=" w-full outline-none border-b p-2"
                value={inputAddress}
              />
            </div>
          </div>
          {/* #TODO 버튼 유효성 검사후 색깔 바꾸기 */}
          <div onClick={handleSignup} className="fixed bottom-0 left-0 w-full p-7">
            <button
              className={`w-full text-white rounded-2xl p-4 font-bold text-xl ${confirmSignup({ address, nickname }) ? 'bg-BID_MAIN' : 'bg-BID_SUB_GRAY'}`}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
