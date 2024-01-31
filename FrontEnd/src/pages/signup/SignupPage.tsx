import DaumPostModal from '@/components/@common/DaumPostModal';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import { useEffect, useState } from 'react';

const SignupPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const info: IHeaderInfo = {
    left: null,
    center: '회원가입',
    right_1: null,
    right_2: null,
    prev: '/',
  };

  useEffect(() => {
    console.log(address);
    // 서비스에 맞는 지역 이름ㅈ으로 잘라야 함
  }, [address]);

  return (
    <>
      {isOpen && <DaumPostModal setIsOpen={setIsOpen} setAddress={setAddress} />}
      <div className="w-full h-screen">
        <Header info={info} />
        <div className="pt-12 w-full h-full px-BID_P ">
          <div className="pt-8">
            <p className="text-lg font-bold">별명</p>
            <div className="flex gap-5">
              <input
                type="text"
                placeholder="사용하실 별명을 입력해주세요"
                className="w-full outline-none border-b p-2"
              />
              <div className="flex justify-center items-center  w-32 bg-BID_BLACK text-white rounded-lg">중복 확인</div>
            </div>
          </div>
          <div className="pt-8 ">
            <p className="text-lg font-bold pb-2">주소</p>
            <p onClick={() => setIsOpen(true)} className="w-full border-b p-2 text-gray-400 ">
              건물, 지번 또는 도로명 검색
            </p>
            <div className="pt-2">
              <input type="text" placeholder="기본 주소" className="w-full outline-none border-b p-2" value={address} />
            </div>
          </div>
          {/* #TODO 버튼 유효성 검사후 색깔 바꾸기 */}
          <div className="fixed bottom-0 left-0 w-full p-7">
            <button className="w-full bg-BID_SUB_GRAY text-white rounded-2xl p-4 font-bold text-xl">다음</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
