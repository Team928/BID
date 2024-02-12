import Header, { IHeaderInfo } from '@/components/@common/Header';
import NotifyItem from '@/components/notify/NotifyItem';
import useNotifyStore from '@/stores/useNotifyStore';
import { IoIosArrowBack } from 'react-icons/io';

const NotifyPage = () => {
  const info: IHeaderInfo = {
    left: <IoIosArrowBack />,
    center: '알림',
    right_1: null,
    right_2: null,
  };

  const { notifyList } = useNotifyStore();
  return (
    <div className="w-full h-screen">
      <Header info={info} />
      <div className="pt-12">
        {notifyList.map((item, index) => {
          return <NotifyItem key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default NotifyPage;
