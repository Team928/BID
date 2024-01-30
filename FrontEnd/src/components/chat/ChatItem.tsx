import React, { useRef } from "react";
import { BsEmojiSunglasses } from "react-icons/bs";

export interface IItem {
  id: number;
  roomName: string;
  dealId: number;
  hostId: number;
  guestId: number;
  createTime: string;
  updateTime: string;
}

const ChatItem = (props: { item: IItem }) => {
  const { id, roomName } = props.item;

  return (
    <>
      <div className="flex pl-6 py-3 border-b border-[#D9D9D9]">
        <Item>
          <div className="flex justify-between overflow-hidden w-full">
            <div className=" flex">
              <div>
                <BsEmojiSunglasses size={"3.5rem"} color="#545454" />
              </div>
              <div className="flex flex-col gap-1 px-5">
                <p className="font-bold">{id}</p>
                <p>{roomName}</p>
              </div>
            </div>
            <div className="flex items-center">
              {/* TODO: unread messages count해서 실제 데이터로 추가하기 */}
              <span className="bg-orange-500 rounded-full h-6 w-6 flex items-center justify-center text-white font-semibold">
                3
              </span>
            </div>
          </div>
        </Item>
      </div>
    </>
  );
};

export default ChatItem;

const Item: React.FC = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  let downX: number;
  let isClicked = false;

  const onPointMove = (e: MouseEvent) => {
    // 클릭 유무 처리해서 애니메 작동 안 되게
    if (!isClicked) return;
    const newX = e.clientX;
    
    if (newX - downX < -30) {
      ref.current.style.transform = "translateX(-55px)";
      setTimeout(() => {
        if (ref.current) ref.current.style.transform = "translateX(0px)";
      }, 4000);
    } else ref.current.style.transform = "translateX(0px)";
  };

  const onPointerUp = () => {
    if (ref.current) {
    ref.current.removeEventListener("pointermove", onPointMove);
    ref.current.style.transform = "translate-x-0";
    }
    isClicked = false;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isClicked = true;
    downX = e.clientX;
    document.addEventListener("pointermove", onPointMove);
  };

  return (
    <div
      className="flex w-full transition-transform duration-800 relative" 
      onPointerDown={onPointerDown}
      ref={ref}
      onPointerUp={onPointerUp}
    >
      {children}
      <button
        className="text-sm text-red-500 px-0 translate-x-full" // 처음에는 버튼을 오른쪽 밖으로 이동시킴
      >
        delete
      </button>
    </div>
  );
};
