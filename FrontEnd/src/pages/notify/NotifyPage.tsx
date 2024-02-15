import alarm from '@/assets/icon/alarm.png';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import NotifyItem from '@/components/notify/NotifyItem';
import notifyReadStore from '@/stores/notifyReadStore';
import useNotifyStore from '@/stores/useNotifyStore';
import { useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const NotifyPage = () => {
  const info: IHeaderInfo = {
    left: <IoIosArrowBack />,
    center: '알림',
    right_1: null,
    right_2: null,
  };

  const { setIsRead } = notifyReadStore();
  const { notifyList } = useNotifyStore();

  useEffect(() => {
    setIsRead();
  }, []);
  return (
    <div className="w-full h-screen">
      <Header info={info} />
      <div className="pt-12">
        {notifyList.length === 0 ? (
          <div className="flex justify-center items-center h-[calc(100vh-48px)] flex-col">
            <img src={alarm} width={40} />
            <div className="pt-5">수신한 알림이 없어요</div>
          </div>
        ) : (
          notifyList.map((item, index) => {
            return <NotifyItem key={index} item={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default NotifyPage;
