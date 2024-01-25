import { PiChatsCircle } from 'react-icons/pi';
import { PiUser } from 'react-icons/pi';
import { GoHome } from 'react-icons/go';
import { IoBookmarksOutline } from 'react-icons/io5';
import { PiPencilSimpleLine } from 'react-icons/pi';
import { useLocation, useNavigate } from 'react-router-dom';

const Bottom = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menu = [
    {
      name: '홈',
      path: '/',
      selectIcon: <GoHome size={'2rem'} color="#3498DB" />,
      defaultIcon: <GoHome size={'2rem'} color="#545454" />,
    },
    {
      name: '북마크',
      path: '/scrap',
      selectIcon: (
        // 사이즈를 줄여야 다른 아이콘과 맞아서 <div>태그로 감싸서 해결했습니다
        <div className="w-8 h-8 flex  items-center justify-center">
          <IoBookmarksOutline size={'1.6rem'} color="#3498DB" />
        </div>
      ),
      defaultIcon: (
        <div className="w-8 h-8 flex  items-center justify-center">
          <IoBookmarksOutline size={'1.6rem'} color="#545454" />
        </div>
      ),
    },
    {
      name: '글쓰기',
      path: '/write',
      selectIcon: <PiPencilSimpleLine size={'2rem'} color="#3498DB" />,
      defaultIcon: <PiPencilSimpleLine size={'2rem'} color="#545454" />,
    },
    {
      name: '채팅',
      path: '/chat',
      selectIcon: <PiChatsCircle size={'2rem'} color="#3498DB" />,
      defaultIcon: <PiChatsCircle size={'2rem'} color="#545454" />,
    },
    {
      name: '마이',
      path: '/profile',
      selectIcon: <PiUser size={'2rem'} color="#3498DB" />,
      defaultIcon: <PiUser size={'2rem'} color="#545454" />,
    },
  ];

  return (
    <>
      <div className="fixed px-4 bottom-0 w-full h-[4.5rem] bg-white z-10 text-[#A9A9A9] border-t border-[#D9D9D9] text-sm">
        <div className="py-2 flex justify-around items-center">
          {menu.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => navigate(`${item.path}`)}
                className="flex flex-col items-center cursor-pointer"
              >
                {pathname === item.path ? (
                  <>
                    {item.selectIcon}
                    <p className="text-BID_MAIN">{item.name}</p>
                  </>
                ) : (
                  <>
                    {item.defaultIcon}
                    <p>{item.name}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Bottom;
