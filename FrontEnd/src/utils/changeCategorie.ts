const categoriesEng = new Map();
categoriesEng.set('ALL', '전체');
categoriesEng.set('FASHION', '패션잡화');
categoriesEng.set('BEAUTY', '뷰티');
categoriesEng.set('CHILD', '유아동');
categoriesEng.set('LIVING', '리빙');
categoriesEng.set('DIGITAL', '디지털/가전');
categoriesEng.set('BOOK', '도서/음반');
categoriesEng.set('TOY', '완구/취미');
categoriesEng.set('PET', '반려동물');
categoriesEng.set('ETC', '기타');

const categoriesKR = new Map();
categoriesKR.set('전체', 'ALL');
categoriesKR.set('패션잡화', 'FASHION');
categoriesKR.set('뷰티', 'BEAUTY');
categoriesKR.set('유아동', 'CHILD');
categoriesKR.set('리빙', 'LIVING');
categoriesKR.set('디지털/가전', 'DIGITAL');
categoriesKR.set('도서/음반', 'BOOK');
categoriesKR.set('완구/취미', 'TOY');
categoriesKR.set('반려동물', 'PET');
categoriesKR.set('기타', 'ETC');

// 카테고리 영어 -> 한국어 변환 함수
export const changeEngToKr = (eng: string) => {
  return categoriesEng.get(eng);
};

// 카테고리 한국어 -> 영어 변환 함수
export const changeKrToEng = (kr: string) => {
  return categoriesKR.get(kr);
};
