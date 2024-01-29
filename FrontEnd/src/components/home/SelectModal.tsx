import { FaCheck } from 'react-icons/fa6';

interface ISelectModal {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  state: { state: string; lower: string[] };
  lowerState: string;
  setLowerState: React.Dispatch<React.SetStateAction<string>>;
}

const SelectModal = ({ setIsOpen, state, lowerState, setLowerState }: ISelectModal) => {
  // 경매 시작전 f -> 최신순, 경매 시작 임박
  // 경매 진행중 t -> 최신순, 라이브진행중,  경매마감임박

  const itemClickEvent = (lower: string) => {
    setLowerState(lower);
    setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className="w-screen h-screen fixed left-0 top-0 bottom-0 right-0 z-20 bg-black/30"
      ></div>
      <div className="fixed bottom-0 h-80 w-screen pt-5 pb-10 px-BID_P rounded-t-3xl bg-white z-30">
        <div className="h-full flex flex-col justify-between font-bold text-xl">
          <p className="text-center text-lg">{state.state}</p>
          <div className="flex flex-col  gap-5">
            {state.lower.map((lower, index) => {
              return (
                <div key={index} onClick={() => itemClickEvent(lower)} className="flex justify-between">
                  <p className={`${lowerState === lower && 'text-BID_MAIN'}`}>{lower}</p>
                  {lowerState === lower && <FaCheck color="#3498DB" />}
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
