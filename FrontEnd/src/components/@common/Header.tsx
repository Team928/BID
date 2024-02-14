import notify from '@/assets/icon/notify.png';
import search from '@/assets/icon/search.png';
import bid from '@/assets/image/BID.png';
import { useNavigate } from 'react-router-dom';
export interface IHeaderInfo {
  left: JSX.Element | null;
  center: string | null;
  right_1: JSX.Element | null;
  right_2: JSX.Element | null;
}

const Header = (props: { info: IHeaderInfo }) => {
  const navigate = useNavigate();

  const { left, center, right_1, right_2 } = props.info;

  return (
    <div className="bg-white w-full px-BID_P h-12 flex justify-between items-center fixed top-0 z-10 max-w-[500px]">
      {!left && !center && (
        <div className="h-full w-full">
          <img src={bid} className="h-full py-[0.9rem] cursor-pointer" />
        </div>
      )}
      <button className="basis-1/5">{left && <div onClick={() => navigate(-1)}>{left}</div>}</button>
      {center && <div className="text-lg font-semibold">{center}</div>}
      <div className="basis-1/5 flex gap-3 justify-end">
        {right_1 && (
          <div className="cursor-pointer">
            <img onClick={() => navigate('/search')} src={search} className="w-5 h-5" />
          </div>
        )}
        {right_2 && (
          <div className="cursor-pointer">
            <img onClick={() => navigate('/notify')} src={notify} className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
