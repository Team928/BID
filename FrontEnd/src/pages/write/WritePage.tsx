import Bottom from '@/components/@common/Bottom';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import { Link } from 'react-router-dom';

const WritePage = () => {
  const info: IHeaderInfo = {
    left: null,
    center: '글쓰기',
    right_1: null,
    right_2: null,
  };

  return (
    <>
      <div className="w-full h-screen pb-[4.5rem]">
        <Header info={info} />
        <div className="pt-12 px-BID_P h-full overflow-y-auto">
          <div className={`text-xl font-bold py-8`}>
            <p>글을 작성하고</p>
            <p>라이브를 진행해보세요</p>
          </div>
          <div className="flex flex-col gap-5 pt-8">
            <Link to="/write/sale">
              <div className="w-full bg-white text-BID_MAIN border border-BID_MAIN rounded-2xl text-center p-4 text-lg font-bold">
                판매 글쓰기
              </div>
            </Link>
            <Link to="/write/buy">
              <div className="w-full bg-BID_MAIN text-white rounded-2xl text-center p-4 text-lg font-bold">
                구매 글쓰기
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Bottom />
    </>
  );
};

export default WritePage;
