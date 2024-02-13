const Recommend = () => {
  const suggestionKeyword: string[] = [
    '미노이 굿즈',
    '스투시 백팩',
    '스탠리x스타벅스',
    '빵빵이 굿즈',
    '코비 농구화',
    '뉴발란스996',
  ];
  return (
    <div className="py-4">
      <p className="font-bold text-lg">추천검색어</p>
      <div className="flex flex-wrap pt-3 gap-2 text-[13px]">
        {suggestionKeyword.map((item, index) => {
          return (
            <div key={index} className="bg-[#F4F4F4] rounded-full px-2 py-1">
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommend;
