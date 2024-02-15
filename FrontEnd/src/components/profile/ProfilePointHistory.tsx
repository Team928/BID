import { useProfile } from '@/hooks/profile/useProfile';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { getDate } from '@/utils/getDate';

const ProfilePointHistory = () => {
  const { useUserPointHistory } = useProfile();
  const { data: historyInfo } = useUserPointHistory();

  return (
    <div className="pt-5 w-full flex flex-col gap-5">
      {historyInfo?.data.pointHistorySimpleResList.length === 0 ? (
        <div className="w-full h-[calc(100vh-68px)] flex justify-center items-center">포인트 사용 내역이 없어요</div>
      ) : (
        historyInfo?.data.pointHistorySimpleResList.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm gap-4">
            {item.status === 'CHARGE' && (
              <>
                <div className="bg-BID_BLACK text-white flex justify-center items-center border text-center w-14 h-14 rounded-full ">
                  충전
                </div>
                <div className="flex-1">
                  <p>{getDate(item.time).fullDate2}</p>
                  <p className="font-semibold pt-1">포인트 충전</p>
                </div>

                <p className="text-base font-bold">+ {addCommaToPrice(item.amount)}원</p>
              </>
            )}
            {item.status === 'RECEIVE' && (
              <>
                <div className="bg-BID_MAIN text-white flex justify-center items-center border text-center w-14 h-14 rounded-full ">
                  입금
                </div>
                <div className="flex-1">
                  <p>{getDate(item.time).fullDate2}</p>
                  <p className="font-semibold pt-1">물건 판매 완료</p>
                </div>

                <p className="text-base font-bold">+ {addCommaToPrice(item.amount)}원</p>
              </>
            )}
            {item.status === 'FREE' && (
              <>
                <div className="bg-BID_BLACK text-white flex justify-center items-center border text-center w-14 h-14 rounded-full ">
                  취소
                </div>
                <div className="flex-1">
                  <p>{getDate(item.time).fullDate2}</p>
                  <p className="font-semibold pt-1">상위 입찰 발생</p>
                </div>

                <p className="text-base font-bold">+ {addCommaToPrice(item.amount)}원</p>
              </>
            )}
            {item.status === 'HOLD' && (
              <>
                <div className="flex justify-center items-center border border-red-600 text-red-600 text-center w-14 h-14 rounded-full ">
                  입찰
                </div>
                <div className="flex-1">
                  <p>{getDate(item.time).fullDate2}</p>
                  <p className="font-semibold pt-1">입찰 - 포인트 차감</p>
                </div>

                <p className="text-base font-bold text-red-600">- {addCommaToPrice(item.amount)}원</p>
              </>
            )}
            {item.status === 'USE' && (
              <>
                <div className="bg-BID_MAIN text-white flex justify-center items-center border text-center w-14 h-14 rounded-full ">
                  낙찰
                </div>
                <div className="flex-1">
                  <p>{getDate(item.time).fullDate2}</p>
                  <p className="font-semibold pt-1">거래 낙찰 완료</p>
                </div>

                <p className="text-base font-bold">{addCommaToPrice(item.amount)}원</p>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ProfilePointHistory;
