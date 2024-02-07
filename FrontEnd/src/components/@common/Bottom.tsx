import { PiChatsCircle } from 'react-icons/pi';
import { PiUser } from 'react-icons/pi';
import { GoHome } from 'react-icons/go';
import { PiPencilSimpleLine } from 'react-icons/pi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsSuitHeart } from 'react-icons/bs';
import SelectWriteModal from './SelectWirteModal';

const Bottom = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState); 
  };

  const menu = [
    {
      name: '홈',
      path: '/',
      selectIcon: <GoHome size={'1.8rem'} color="#3498DB" />,
      defaultIcon: <GoHome size={'1.8rem'} color="#545454" />,
    },
    {
      name: '위시',
      path: '/scrap',
      selectIcon: (
        <div className="w-8 h-8 flex  items-center justify-center">
          <BsSuitHeart size={'1.6rem'} color="#3498DB" />
        </div>
      ),
      defaultIcon: (
        <div className="w-8 h-8 flex  items-center justify-center">
          <BsSuitHeart size={'1.6rem'} color="#545454" />
        </div>
      ),
    },
    {
      name: '글쓰기',
      path: '',
      selectIcon: <PiPencilSimpleLine onClick={toggleModal} size={'1.8rem'} color={isModalOpen ? "#3498DB" : "#545454"} />, // 모달이 열릴 때 BID_MAIN 컬러로 변경됩니다.
      defaultIcon: <PiPencilSimpleLine onClick={toggleModal}  size={'1.8rem'} color="#545454" />,
    },
    {
      name: '채팅',
      path: '/chat',
      selectIcon: <PiChatsCircle size={'1.8rem'} color="#3498DB" />,
      defaultIcon: <PiChatsCircle size={'1.8rem'} color="#545454" />,
    },
    {
      name: '마이',
      path: '/profile',
      selectIcon: <PiUser size={'1.8rem'} color="#3498DB" />,
      defaultIcon: <PiUser size={'1.8rem'} color="#545454" />,
    },
  ];

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <>
    {isModalOpen && <SelectWriteModal closeModal={toggleModal} />}
      <div className="fixed px-4 bottom-0 w-full h-[4.5rem] bg-white z-10 text-[#A9A9A9] border-t border-[#D9D9D9] text-sm">
        <div className="py-2 flex justify-around items-center">
          {menu.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center cursor-pointer text-xs"
            >
              {pathname === item.path ? (
                <>
                  {item.selectIcon}
                  <p className="text-BID_MAIN ">{item.name}</p>
                </>
              ) : (
                <>
                  {item.defaultIcon}
                  <p>{item.name}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Bottom;
