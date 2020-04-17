export default function restoreSavedGoods() {
  const goodsArray = [];
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      const item = localStorage.getItem(key);
      if (item !== 'INFO') {
        const oldGood = JSON.parse(item);
        goodsArray.push(oldGood);
      }
    }
  }
  return goodsArray;
}
