import { IoBookmarksOutline } from 'react-icons/io5';
const DetailBottom = () => {
  return (
    <div className="fixed px-4 bottom-0 w-full h-[4.5rem] bg-white z-10 text-[#A9A9A9] border-t border-[#D9D9D9] text-sm">
      <div className="w-full h-full py-2 flex items-center gap-3">
        <IoBookmarksOutline size={'2rem'} color="#545454" />
        {/* #TODO 상태에 따라 버튼 내용 및 이벤트 달라져야함 */}
        <div className="w-full py-3 bg-BID_MAIN text-white rounded-xl text-center text-lg font-bold">즉시 구매하기</div>
      </div>
    </div>
  );
};

export default DetailBottom;
