import { AiOutlineNotification } from 'react-icons/ai';

// 임시
export interface IItem {
  type: string;
  content: string;
  time: string;
}

const NotifyItem = (props: { item: IItem }) => {
  const { type, content, time } = props.item;

  return (
    <div className="flex gap-4 px-6 py-3 border-b border-[#D9D9D9]">
      <div className="cursor-pointer">
        <AiOutlineNotification size={'1.8rem'} color="#545454" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold">{type}</p>
        <p>{content}</p>
        <p className="text-[#A9A9A9] text-sm">{time}</p>
      </div>
    </div>
  );
};

export default NotifyItem;
