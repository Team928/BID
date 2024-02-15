import bid from '@/assets/image/BID.png';
import notifyReadStore from '@/stores/notifyReadStore';
import { useNavigate } from 'react-router-dom';
export interface IHeaderInfo {
  left: JSX.Element | null;
  center: string | null;
  right_1: JSX.Element | null;
  right_2: JSX.Element | null;
}

const Header = (props: { info: IHeaderInfo }) => {
  const navigate = useNavigate();

  const { isRead } = notifyReadStore();
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
      <div className="basis-1/5 flex gap-2 justify-end">
        {right_1 && (
          <svg
            onClick={() => navigate('/search')}
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        )}
        {right_2 && (
          <div onClick={() => navigate('/notify')} className="cursor-pointer relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#000000" viewBox="0 0 256 256">
              <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
            </svg>
            {!isRead && <div className="absolute right-[2px] top-0 w-2 h-2 rounded-full bg-[#E14246]"></div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
