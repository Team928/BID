import { useNavigate } from 'react-router-dom';

export interface IHeaderInfo {
  left: JSX.Element | null;
  center: string | null;
  right_1: JSX.Element | null;
  right_2: JSX.Element | null;
  prev: string;
}

const Header = (props: { info: IHeaderInfo }) => {
  const navigate = useNavigate();

  const { left, center, right_1, right_2, prev } = props.info;

  return (
    <div className="bg-white w-full px-BID_P h-12 flex justify-between items-center border-b border-[#D9D9D9] fixed top-0 z-10">
      <div className="basis-1/5">{left && <div onClick={() => navigate(prev)}>{left}</div>}</div>
      {center && <div className="font-bold text-lg">{center}</div>}
      <div className="basis-1/5 flex gap-3 justify-end">
        {right_1 && (
          <div className="cursor-pointer">
            <img
              onClick={() =>
                navigate('/search', {
                  state: {
                    prev: prev,
                  },
                })
              }
              src="/src/assets/icon/search.png"
            />
          </div>
        )}
        {right_2 && (
          <div className="cursor-pointer">
            <img
              onClick={() =>
                navigate('/notify', {
                  state: {
                    prev: prev,
                  },
                })
              }
              src="/src/assets/icon/notify.png"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
