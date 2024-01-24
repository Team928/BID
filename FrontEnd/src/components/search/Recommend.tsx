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
      <p className="font-bold text-xl">추천검색어</p>
      <div className="flex flex-wrap pt-5 gap-4 text-sm">
        {suggestionKeyword.map((item, index) => {
          return (
            <div key={index} className="bg-[#F4F4F4] rounded-3xl p-2">
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommend;
