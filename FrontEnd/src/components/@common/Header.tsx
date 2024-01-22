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
    <div className="bg-white w-full px-6 h-12 flex justify-between items-center border-b border-[#D9D9D9] fixed top-0">
      <div className="basis-1/5">{left && <div onClick={() => navigate(-1)}>{left}</div>}</div>
      {center && <div className="font-bold text-lg">{center}</div>}
      <div className="basis-1/5 flex gap-3 justify-end">
        {right_1 && <img onClick={() => navigate('search')} src="/src/assets/icon/search.png" />}
        {right_2 && <img onClick={() => navigate('notify')} src="/src/assets/icon/notify.png" />}
      </div>
    </div>
  );
};

export default Header;
