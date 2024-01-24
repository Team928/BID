import Popular from '@/components/search/Popular';
import Recommend from '@/components/search/Recommend';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prev = location.state.prev;
  // #TODO 추후 서비스에 맞는 더미데이터로 채워넣기

  // #TODO 검색 구현해야함

  return (
    <>
      <div className="bg-white w-full px-6 h-16 flex items-center border-b border-[#D9D9D9] fixed top-0">
        <input
          type="text"
          placeholder="제목으로 검색해보세요"
          className="p-3 outline-none border w-full rounded-lg bg-[#F4F4F4]"
        ></input>
        <div onClick={() => navigate(prev)} className="pl-4">
          <p className="cursor-pointer font-bold w-8">취소</p>
        </div>
      </div>
      <div className="pt-16 px-6">
        <Recommend />
        <Popular />
      </div>
    </>
  );
};

export default SearchPage;
