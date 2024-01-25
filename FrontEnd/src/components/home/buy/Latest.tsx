import { changeEngToKr } from '@/utils/changeCategorie';

const Latest = () => {
  return (
    <>
      <div className="py-4 border-b border-[#D9D9D9]">
        <div className="px-BID_P">
          <p className="font-bold">최신 구매글을 확인해보세요</p>
          <p className="text-xs text-BID_BLACK">따끈따근한 최신글</p>
        </div>
        <div className="pl-4 py-4 flex flex-nowrap overflow-x-auto">
          {list.map(item => {
            return (
              <>
                <div className="text-xs ">
                  <div className="w-32 h-32 bg-BID_LIGHT_GRAY rounded-2xl relative">
                    <div className="w-full h-full absolute bg-black/10 rounded-2xl"></div>
                    <img src="/src/assets/image/sample.png" className="w-full h-full rounded-2xl object-cover" />
                    <div className="absolute top-9 left-8">
                      <p className="text-white font-bold text-lg ">1/5 (금)</p>
                      <p className="text-white font-bold text-2xl">10:00</p>
                    </div>
                  </div>
                  <div className="px-1 flex flex-col gap-1">
                    <p className=" text-[0.6rem] text-BID_SUB_GRAY">{changeEngToKr(item.categories)}</p>
                    <p className=" w-32 truncate whitespace-normal line-clamp-2">{item.title}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Latest;

const list = [
  {
    id: 1,
    title: '1년도 안쓴 아이폰 15프로 팝니다. 상태좋아요 짱입니다.',
    content: '이것저것 삽니다 팝니다',
    categories: 'Etc',
    startTime: '2024-01-17 15:30:00',
  },
  {
    id: 2,
    title: '1년도 안쓴 아이폰 15프로 팝니다. 상태좋아요 짱입니다.',

    content: '이것저것 삽니다 팝니다',
    categories: 'Etc',
    startTime: '2024-01-17 15:30:00',
  },
  {
    id: 3,
    title: '1년도 안쓴 아이폰 15프로 팝니다. 상태좋아요 짱입니다.',

    content: '이것저것 삽니다 팝니다',
    categories: 'Etc',
    startTime: '2024-01-17 15:30:00',
  },
  {
    id: 4,
    title: '1년도 안쓴 아이폰 15프로 팝니다. 상태좋아요 짱입니다.',

    content: '이것저것 삽니다 팝니다',
    categories: 'Etc',
    startTime: '2024-01-17 15:30:00',
  },
  {
    id: 5,
    title: '1년도 안쓴 아이폰 15프로 팝니다. 상태좋아요 짱입니다.',

    content: '이것저것 삽니다 팝니다',
    categories: 'Etc',
    startTime: '2024-01-17 15:30:00',
  },
];
