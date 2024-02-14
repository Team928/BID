import { useEffect, useState } from 'react';
import { BsSuitHeart } from 'react-icons/bs';
import { GoHome } from 'react-icons/go';
import { PiChatsCircle, PiPencilSimpleLine, PiUser } from 'react-icons/pi';
import { useLocation, useNavigate } from 'react-router-dom';
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
      selectIcon: <GoHome size={'1.5rem'} color="#ffffff" />,
      defaultIcon: <GoHome size={'1.5rem'} color="#545454" />,
    },
    {
      name: '위시',
      path: '/scrap',
      selectIcon: (
        <div className="w-8 h-8 flex  items-center justify-center">
          <BsSuitHeart size={'1.3rem'} color="#ffffff" />
        </div>
      ),
      defaultIcon: (
        <div className="w-8 h-8 flex  items-center justify-center">
          <BsSuitHeart size={'1.3rem'} color="#545454" />
        </div>
      ),
    },
    {
      name: '글쓰기',
      path: '',
      selectIcon: <PiPencilSimpleLine size={'1.5rem'} color={isModalOpen ? '#ffffff' : '#545454'} />,
      defaultIcon: <PiPencilSimpleLine onClick={toggleModal} size={'1.5rem'} color="#545454" />,
    },
    {
      name: '채팅',
      path: '/chat',
      selectIcon: <PiChatsCircle size={'1.5rem'} color="#ffffff" />,
      defaultIcon: <PiChatsCircle size={'1.5rem'} color="#545454" />,
    },
    {
      name: '마이',
      path: '/profile',
      selectIcon: <PiUser size={'1.5rem'} color="#ffffff" />,
      defaultIcon: <PiUser size={'1.5rem'} color="#545454" />,
    },
  ];

  useEffect(() => {
    console.log(pathname);
    console.log(pathname.split('/')[0]);
    console.log(pathname.split('/')[1]);
  }, [pathname]);

  return (
    <>
      {isModalOpen && <SelectWriteModal closeModal={toggleModal} />}
      <div className="fixed px-4 bottom-0 w-full h-[65px] bg-[#272727] z-10 text-[#A9A9A9] text-sm max-w-[500px]">
        <div className="py-1 flex justify-around items-center">
          <div onClick={() => navigate(`/`)} className="flex flex-col items-center cursor-pointer text-xs">
            {pathname === '/' || pathname.split('/')[1] === 'sale' || pathname.split('/')[1] === 'buy' ? (
              <>
                {menu[0].selectIcon}
                <p className="text-white ">{menu[0].name}</p>
              </>
            ) : (
              <>
                {menu[0].defaultIcon}
                <p>{menu[0].name}</p>
              </>
            )}
          </div>
          <div onClick={() => navigate(`/scrap`)} className="flex flex-col items-center cursor-pointer text-xs">
            {pathname.split('/')[1] === 'scrap' ? (
              <>
                {menu[1].selectIcon}
                <p className="text-white ">{menu[1].name}</p>
              </>
            ) : (
              <>
                {menu[1].defaultIcon}
                <p>{menu[1].name}</p>
              </>
            )}
          </div>
          <div onClick={() => toggleModal} className="flex flex-col items-center cursor-pointer text-xs">
            {pathname.split('/')[1] == 'write' ? (
              <>
                {menu[2].selectIcon}
                <p className="text-white ">{menu[2].name}</p>
              </>
            ) : (
              <>
                {menu[2].defaultIcon}
                <p>{menu[2].name}</p>
              </>
            )}
          </div>
          <div onClick={() => navigate(`/chat`)} className="flex flex-col items-center cursor-pointer text-xs">
            {pathname.split('/')[1] === 'chat' ? (
              <>
                {menu[3].selectIcon}
                <p className="text-white ">{menu[3].name}</p>
              </>
            ) : (
              <>
                {menu[3].defaultIcon}
                <p>{menu[3].name}</p>
              </>
            )}
          </div>
          <div onClick={() => navigate(`/profile`)} className="flex flex-col items-center cursor-pointer text-xs">
            {pathname.split('/')[1] === 'profile' ? (
              <>
                {menu[4].selectIcon}
                <p className="text-white ">{menu[4].name}</p>
              </>
            ) : (
              <>
                {menu[4].defaultIcon}
                <p>{menu[4].name}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bottom;
