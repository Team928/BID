import { dealStatusType } from '@/types/model';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

interface ISelectModal {
  order: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  state: dealStatusType | '';
  setState: React.Dispatch<React.SetStateAction<dealStatusType | ''>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sort: { state: string; lower: string[] };
}

const SelectModal = ({ order, setOrder, state, setState, setIsOpen, sort }: ISelectModal) => {
  // 경매 시작전 BEFORE -> 최신순, 경매 시작 임박
  // 경매 진행중 AUCTION -> 최신순,  경매마감임박

  const itemClickEvent = (lower: string) => {
    setState(sort.state === '경매 시작전' ? 'BEFORE' : 'AUCTION');
    setOrder(lower);
    setIsOpen(false);
  };

  const [temp, setTemp] = useState<string>('');

  useEffect(() => {
    setTemp(state === 'BEFORE' ? '경매 시작전' : '경매 진행중');
  }, []);

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className="w-full h-screen fixed left-0 top-0 bottom-0 right-0 z-20 bg-black/30 "
      ></div>
      <div className="fixed bottom-0 h-72 w-full pt-5 pb-10 px-BID_P rounded-t-3xl bg-white z-30 max-w-[500px]">
        <div className="h-full flex flex-col justify-between font-bold text-xl">
          <p className="text-center text-lg">{sort.state}</p>
          <div className="flex flex-col gap-5">
            {sort.lower.map((lower, index) => {
              return (
                <div key={index} onClick={() => itemClickEvent(lower)} className="flex justify-between">
                  <p className={`${order === lower && temp === sort.state && 'text-BID_MAIN'}`}>{lower}</p>
                  {order === lower && temp === sort.state && <FaCheck color="#3498DB" />}
                </div>
              );
            })}
          </div>
          <div className="border-t pt-5 text-center ">
            <p onClick={() => setIsOpen(false)} className="">
              닫기
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectModal;
