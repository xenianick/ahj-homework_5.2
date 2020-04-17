import createNewElement from './createNewElement.js';
import restoreSavedGoods from './restoreSavedGoods.js';
import { checkNameValidity, checkPriceValidity } from './checkFormValidity.js';
import manageError from './manageError.js';
import createPopup from './createPopup.js';
import prettifyPrice from './prettifyPrice.js';
import Good from './Good.js';
import createGoodCard from './createGoodCard.js';

const bodyEl = document.querySelector('body');

const mainContainer = createNewElement('div', 'main-container');

const headerContainer = createNewElement('div', 'header-container');
const header = createNewElement('div', 'header', '<p>Товары</p>');
const addGoodBtn = createNewElement('div', 'add-good-btn', '<p>+</p>');
headerContainer.appendChild(header);
headerContainer.appendChild(addGoodBtn);

const goodsContainer = createNewElement('div', 'goods-container');
const goodsContainerHeader = createNewElement('div', 'goods-container-header', '<p>Название</p><p>Стоимость</p><p>Действия</p>');
goodsContainer.appendChild(goodsContainerHeader);

mainContainer.appendChild(headerContainer);
mainContainer.appendChild(goodsContainer);
bodyEl.insertBefore(mainContainer, bodyEl.firstChild);

// получаем из localStorage данные о сохраненных товарах и кладем в массив
const goodsArray = restoreSavedGoods();
// добавляем их на страницу
goodsArray.forEach((good) => {
  const goodCard = createGoodCard(good, goodsArray);
  goodsContainer.appendChild(goodCard);
});
// по клику на кнопку добавления товаров создаем и вставляем попап
addGoodBtn.addEventListener('click', () => {
  const popup = createPopup();
  const addingForm = popup.querySelector('.good-adding-form');
  const resetBtn = popup.querySelector('.good-reset-btn');
  const nameInput = popup.querySelector('.good-name-field');
  const priceInput = popup.querySelector('.good-price-field');
  bodyEl.insertBefore(popup, bodyEl.lastChild);
  // по клику на сабмит проверяем форму
  addingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const isValidName = checkNameValidity(nameInput.value);
    const isValidPrice = checkPriceValidity(priceInput.value);
    if (!isValidName) {
      manageError(nameInput, addingForm, 'Тут нужно написать название товара');
    }
    if (!isValidPrice) {
      manageError(priceInput, addingForm, 'Должна содержать только цифры и быть больше 0');
    }
    if (isValidName && isValidPrice) {
      // создаем новый товар и доваляем его в массив и localStorage
      const prettyPrice = prettifyPrice(priceInput.value);
      const newGood = new Good(nameInput.value, prettyPrice);
      goodsArray.push(newGood);
      const newGoodString = JSON.stringify(newGood);
      localStorage.setItem(newGood.id, newGoodString);
      // создаем карточку товара и добавляем её на страницу
      const newGoodCard = createGoodCard(newGood, goodsArray);
      goodsContainer.appendChild(newGoodCard);
      addingForm.reset();
      popup.remove();
    }
  });
  resetBtn.addEventListener('click', () => {
    popup.remove();
  });
});
