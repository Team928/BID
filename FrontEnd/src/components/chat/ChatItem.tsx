
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

const ChatItem = (props: {item: IItem}) => {
  const { id, roomName, updateTime } = props.item;

  return (
    <div className="flex gap-4 px-6 py-3 border-b border-[#D9D9D9]">
      <div className="flex items-center">
        <BsEmojiSunglasses size={'3.5rem'} color="#545454" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold">{id}</p>
        <p>{roomName}</p>
        <p className="text-[#A9A9A9] text-sm">{updateTime}</p>
      </div>
    </div>
  )
}

export default ChatItem;
