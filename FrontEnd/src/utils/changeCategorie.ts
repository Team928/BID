const categoriesEng = new Map();
categoriesEng.set('All', '전체');
categoriesEng.set('Fashion', '패션잡화');
categoriesEng.set('Beauty', '뷰티');
categoriesEng.set('Child', '유아동');
categoriesEng.set('Living', '리빙');
categoriesEng.set('Digital', '디지털/가전');
categoriesEng.set('Book', '도서/음반');
categoriesEng.set('Toy', '완구/취미');
categoriesEng.set('Pet', '반려동물');
categoriesEng.set('Etc', '기타');

const categoriesKR = new Map();
categoriesKR.set('전체', 'All');
categoriesKR.set('패션잡화', 'Fashion');
categoriesKR.set('뷰티', 'Beauty');
categoriesKR.set('유아동', 'Child');
categoriesKR.set('리빙', 'Living');
categoriesKR.set('디지털/가전', 'Digital');
categoriesKR.set('도서/음반', 'Book');
categoriesKR.set('완구/취미', 'Toy');
categoriesKR.set('반려동물', 'Pet');
categoriesKR.set('기타', 'Etc');

export const changeEngToKr = (eng: string) => {
  return categoriesEng.get(eng);
};

export const changeKrToEng = (kr: string) => {
  return categoriesKR.get(kr);
};
