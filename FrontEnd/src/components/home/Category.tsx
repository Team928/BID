import useTabStore from '@/stores/auctionTabStore';
import { changeKrToEng } from '@/utils/changeCategorie';
import { BsBook, BsThreeDots } from 'react-icons/bs';
import { FaDribbble } from 'react-icons/fa';
import { FiMonitor } from 'react-icons/fi';
import { IoPawOutline } from 'react-icons/io5';
import { PiArmchair, PiBaby, PiFlowerTulip, PiTShirt } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();
  const { tab } = useTabStore();

  const category = [
    {
      name: '전체',
      icon: <p className="text-BID_BLACK font-extrabold">ALL</p>,
    },
    {
      name: '도서/음반',
      icon: <BsBook size={'1.5rem'} color="#545454" />,
    },
    {
      name: '완구/취미',
      icon: <FaDribbble size={'1.5rem'} color="#545454" />,
    },
    {
      name: '반려동물',
      icon: <IoPawOutline size={'1.5rem'} color="#545454" />,
    },
    {
      name: '패션잡화',
      icon: <PiTShirt size={'1.6rem'} color="#545454" />,
    },
    {
      name: '뷰티',
      icon: <PiFlowerTulip size={'1.6rem'} color="#545454" />,
    },
    {
      name: '유아동',
      icon: <PiBaby size={'1.7rem'} color="#545454" />,
    },
    {
      name: '리빙',
      icon: <PiArmchair size={'1.7rem'} color="#545454" />,
    },
    {
      name: '디지털/가전',
      icon: <FiMonitor size={'1.4rem'} color="#545454" />,
    },
    {
      name: '기타',
      icon: <BsThreeDots size={'1.7rem'} color="#545454" />,
    },
  ];

  const navigateHandler = (item: string) => {
    const path = changeKrToEng(item).toLowerCase();
    if (tab === 'purchase') {
      navigate(`/buy/${path}`);
    } else if (tab === 'sale') {
      navigate(`/sale/${path}`);
    }
  };
  //
  return (
    <div className="px-BID_P py-6 grid grid-cols-5 gap-y-5 text-xs max-[350px]:grid-cols-4  border-b-2 border-[#E4E4E4]">
      {category.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => navigateHandler(item.name)}
            className="flex flex-col justify-center items-center gap-1"
          >
            <div className=" bg-gray-100 flex justify-center items-center rounded-full w-[3.75rem] h-[3.75rem] cursor-pointer">
              {item.icon}
            </div>
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
