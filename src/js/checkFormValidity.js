function checkNameValidity(name) {
  let isValidName = false;
  if (name.length <= 0) {
    isValidName = false;
  } else {
    isValidName = true;
  }
  return isValidName;
}

function checkPriceValidity(price) {
  const priceNumber = parseInt(price, 10);
  const priceIsNumber = /^[0-9 ]+$/.test(price);
  let isValidPrice = false;
  if (!priceIsNumber || priceNumber <= 0) {
    isValidPrice = false;
  } else {
    isValidPrice = true;
  }
  return isValidPrice;
}

export { checkNameValidity, checkPriceValidity };
