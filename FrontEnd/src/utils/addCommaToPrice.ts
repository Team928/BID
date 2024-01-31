// 가격에 콤마를 추가하는 함수
export default function addCommaToPrice(price: number | null) {
  if (price) return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
