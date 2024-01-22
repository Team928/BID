
import { BsEmojiSunglasses } from "react-icons/bs";

export interface IItem {
  username: string;
  message: string;
  time: string;
}

const ChatItem = (props: {item: IItem}) => {
  const { username, message, time } = props.item;

  return (
    <div className="flex gap-4 px-6 py-3 border-b border-[#D9D9D9]">
      <div className="flex items-center">
        <BsEmojiSunglasses size={'3.5rem'} color="#545454" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold">{username}</p>
        <p>{message}</p>
        <p className="text-[#A9A9A9] text-sm">{time}</p>
      </div>
    </div>
  )
}

export default ChatItem;
