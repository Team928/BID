import { ISaleDetailRes } from '@/types/home';
import { IoBookmarksOutline, IoBookmarks } from 'react-icons/io5';

const DetailBottom = (props: { info: ISaleDetailRes }) => {
  const { status, wished } = props.info;

  // #TODO 위시 등록 및 삭제 해야함
  return (
    <div className="fixed px-4 bottom-0 w-full h-[4.5rem] bg-white z-10 text-[#A9A9A9] border-t border-[#D9D9D9] text-sm">
      <div className="w-full h-full py-2 flex items-center gap-3">
        {wished ? <IoBookmarks size={'2rem'} color="#3498DB" /> : <IoBookmarksOutline size={'2rem'} color="#545454" />}
        <div
          className={`w-full py-3  text-white rounded-xl text-center text-lg font-bold 
          ${status === 'END' ? 'bg-BID_BLACK' : 'bg-BID_MAIN'}`}
        >
          {status === 'BEFORE' ? '즉시 구매하기' : status === 'END' ? '이미 종료된 경매입니다.' : '입찰하기'}
        </div>
      </div>
    </div>
  );
};

export default DetailBottom;
