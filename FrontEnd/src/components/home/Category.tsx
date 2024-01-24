const Category = () => {
  const category = [
    '전체',
    '도서/음반',
    '완구/취미',
    '반려동물',
    '패션잡화',
    '뷰티',
    '유아동',
    '리빙',
    '디지털/가전',
    '기타',
  ];

  return (
    <div className="px-BID_P py-6 grid grid-cols-5 gap-y-5 text-xs max-[350px]:grid-cols-4  border-b-2 border-[#E4E4E4]">
      {category.map((item, index) => {
        return (
          <div key={index} className="flex flex-col justify-center items-center gap-1">
            <div className="rounded-full w-[3.75rem] h-[3.75rem] bg-gray-200"></div>
            <p>{item}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
