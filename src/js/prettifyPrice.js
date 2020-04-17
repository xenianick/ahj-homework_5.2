export default function prettifyPrice(price) {
  return price.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
}
