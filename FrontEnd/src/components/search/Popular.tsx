const Popular = () => {
  const popularityKeyword: string[] = [
    '코지모지',
    '카시나',
    '스피드캣',
    '캐피탈',
    '아디다스 삼바',
    '보메로',
    '마땡킴',
    '덩크로우',
    '스톤아일랜드',
    '푸마',
    '스페지알',
    '크롬하츠',
    '된장포스',
    '키링',
    '포스',
    '코르테츠',
    '에센셜',
    '아크테릭스',
    '덩크',
    '칼하트',
  ];
  return (
    <div className="pt-8">
      <div className="flex justify-between">
        <p className="font-bold text-xl">인기검색어</p>
        <p className="text-[#ABABAB]">01.23 10:00 기준</p>
      </div>
      <div className="pt-5 grid grid-rows-10 grid-flow-col gap-4">
        {popularityKeyword.map((item, index) => {
          return (
            <div key={index} className="flex gap-2">
              <p className="font-bold">{index + 1}</p>
              <p>{item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
