export default function addCommaToPrice(price: number | null) {
  if (price) return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
