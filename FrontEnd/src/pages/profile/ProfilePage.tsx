import Bottom from "@/components/@common/Bottom";
import Header, { IHeaderInfo } from "@/components/@common/Header";
import { icons } from "@/constants/icons";
import { MdOutlineCreate } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {

  const info: IHeaderInfo = {
    left: null,
    center: '프로필',
    right_1: null,
    right_2: icons.NOTIFY,
    prev: '/profile',
  };

  const navigate = useNavigate();

  const moveToNavigate = (path: string) => {
    navigate(path);
  }

  return (
    <>
      <div>
        <Header info={info} />
          {/* 내 프로필 섹션 */}
          <div className="pt-12">
            <div className="flex gap-4 p-8 items-center">
                <div className="w-24 h-24 bg-BID_LIGHT_GRAY rounded-3xl relative"></div>
                  <div className="flex-1 flex flex-col justify-around">
                    <div className="flex">
                      <p className="text-lg font-bold">닉네임</p>
                      <button className="px-2"><MdOutlineCreate /></button>
                    </div>
                    <p className="text-xs text-BID_GRAY py-2">이메일</p>
                    <p className="text-md text-BID_MAIN font-bold">신뢰도 점수</p>
                  </div>
              </div>
            </div>
            {/* 포인트 섹션 */}
            <div className="px-6">
              <div className="w-full h-30 border p-4 rounded-lg">
                <div className="flex px-2 justify-between items-center">
                  <p>나의 포인트</p>
                  <p className="text-xl font-bold">500,000P</p>
                </div>
                <div className="flex justify-end px-2 pt-2 text-lg font-bold">
                  <button className="px-2 text-gray-400">충전</button>
                  <button className="p-2 text-gray-400">환급</button>
                </div>
              </div>
            </div>
            {/* 거래 및 리뷰 내역 */}
            <div className="px-6 pt-4">
              <p className="font-bold px-3 text-xl">나의 거래</p>
              <div className="px-4 py-2">
                <div className="flex justify-between px-2 py-4 border-b">
                  <p className="text-gray-500 text-lg">내 경매 내역</p>
                  <button className="bg-BID_MAIN p-1 rounded-2xl" onClick={() => moveToNavigate('/profile/sale')}>{icons.ARROW_RIGHT}</button>
                </div>
                <div className="flex justify-between px-2 py-4 border-b">
                  <p className="text-gray-500 text-lg">내 역경매 내역</p>
                  <button className="bg-BID_MAIN p-1 rounded-2xl"  onClick={() => moveToNavigate('/profile/buy')}>{icons.ARROW_RIGHT}</button>
                </div>
                <div className="flex justify-between px-2 py-4 border-b">
                  <p className="text-gray-500 text-lg">나의 리뷰 내역</p>
                  <button className="bg-BID_MAIN p-1 rounded-2xl"  onClick={() => moveToNavigate('/profile/review')}>{icons.ARROW_RIGHT}</button>
                </div>
              </div>
            </div>
        <Bottom />
      </div>
    </>
  );
};

export default ProfilePage;
