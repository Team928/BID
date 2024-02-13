import { useProfile } from '@/hooks/profile/useProfile';
import { getDate } from '@/utils/getDate';

const ProfilePointHistory = () => {
  const { useUserPointHistory } = useProfile();
  const { data: historyInfo } = useUserPointHistory();

  return (
    <div className="pt-5 w-full flex flex-col gap-5">
      {historyInfo?.data.pointHistorySimpleResList.map((item, index) => (
        <div key={index} className="flex items-center justify-between text-sm gap-4">
          {item.status === 'CHARGE' && (
            <>
              <div className="bg-BID_BLACK text-white flex justify-center items-center border text-center w-14 h-14 rounded-full ">
                충전
              </div>
              <div className="flex-1">
                <p>{getDate(item.time).fullDate4}</p>
                <p className="font-semibold pt-1">포인트 충전</p>
              </div>

              <p className="text-base font-bold">+ {item.amount}원</p>
            </>
          )}
          {item.status === 'FREE' && (
            <>
              <div className="bg-BID_BLACK text-white flex justify-center items-center border text-center w-14 h-14 rounded-full ">
                취소
              </div>
              <div className="flex-1">
                <p>{getDate(item.time).fullDate4}</p>
                <p className="font-semibold pt-1">입찰 취소</p>
              </div>

              <p className="text-base font-bold">+ {item.amount}원</p>
            </>
          )}
          {item.status === 'HOLD' && (
            <>
              <div className="flex justify-center items-center border border-red-600 text-red-600 text-center w-14 h-14 rounded-full ">
                입찰
              </div>
              <div className="flex-1">
                <p>{getDate(item.time).fullDate4}</p>
                <p className="font-semibold pt-1">입찰 - 포인트 차감</p>
              </div>

              <p className="text-base font-bold text-red-600">- {item.amount}원</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfilePointHistory;
