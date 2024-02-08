import Popular from '@/components/search/Popular';
import Recommend from '@/components/search/Recommend';
import useKeywordStore from '@/stores/keywordStore';
import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement | null>(null);
  // #TODO 추후 서비스에 맞는 더미데이터로 채워넣기
  const { keyword, setKeyword, init } = useKeywordStore();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    init();
  }, []);

  return (
    <>
      <div className="bg-white w-full px-BID_P h-16 flex items-center border-b border-[#D9D9D9] fixed top-0">
        <input
          ref={inputRef}
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="제목으로 검색해보세요"
          className="p-3 outline-none border w-full rounded-lg bg-[#F4F4F4]"
        ></input>
        <div onClick={() => navigate(-1)} className="pl-4">
          <p className="cursor-pointer font-bold w-8">취소</p>
        </div>
      </div>
      <div className="pt-16 px-BID_P">
        <Recommend />
        <Popular />
      </div>
    </>
  );
};

export default SearchPage;
