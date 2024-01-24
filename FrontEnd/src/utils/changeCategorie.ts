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
categoriesKR.set('All', '전체');
categoriesKR.set('Fashion', '패션잡화');
categoriesKR.set('Beauty', '뷰티');
categoriesKR.set('Child', '유아동');
categoriesKR.set('Living', '리빙');
categoriesKR.set('Digital', '디지털/가전');
categoriesKR.set('Book', '도서/음반');
categoriesKR.set('Toy', '완구/취미');
categoriesKR.set('Pet', '반려동물');
categoriesKR.set('Etc', '기타');

export const changeEngToKr = (eng: string) => {
  return categoriesEng.get(eng);
};

export const changeKrToEng = (kr: string) => {
  return categoriesKR.get(kr);
};
