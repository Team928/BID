import { PiChatsCircle } from 'react-icons/pi';
import { PiUser } from 'react-icons/pi';
import { GoHome } from 'react-icons/go';
import { PiPencilSimpleLine } from 'react-icons/pi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { BsSuitHeart } from 'react-icons/bs';

const Bottom = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
        // 사이즈를 줄여야 다른 아이콘과 맞아서 <div>태그로 감싸서 해결했습니다
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
      path: '/write',
      selectIcon: <PiPencilSimpleLine size={'1.8rem'} color="#3498DB" />,
      defaultIcon: <PiPencilSimpleLine size={'1.8rem'} color="#545454" />,
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
    // #TODO 홈 선택되도록 바꿔야함 (경매탭, 역경매탭 등)
    console.log(pathname);
    console.log(pathname.split('/')[0]);
    console.log(pathname.split('/')[1]);
  }, [pathname]);

  return (
    <>
      <div className="fixed px-4 bottom-0 w-full h-[4.5rem] bg-white z-10 text-[#A9A9A9] border-t border-[#D9D9D9] text-sm">
        <div className="py-2 flex justify-around items-center">
          <div onClick={() => navigate(`/`)} className="flex flex-col items-center cursor-pointer text-xs">
            {pathname === '/' || pathname.split('/')[1] === 'sale' || pathname.split('/')[1] === 'buy' ? (
              <>
                {menu[0].selectIcon}
                <p className="text-BID_MAIN ">{menu[0].name}</p>
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
                <p className="text-BID_MAIN ">{menu[1].name}</p>
              </>
            ) : (
              <>
                {menu[1].defaultIcon}
                <p>{menu[1].name}</p>
              </>
            )}
          </div>
          <div onClick={() => navigate(`/write`)} className="flex flex-col items-center cursor-pointer text-xs">
            {pathname.split('/')[1] == 'write' ? (
              <>
                {menu[2].selectIcon}
                <p className="text-BID_MAIN ">{menu[2].name}</p>
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
                <p className="text-BID_MAIN ">{menu[3].name}</p>
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
                <p className="text-BID_MAIN ">{menu[4].name}</p>
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
