/* eslint-disable no-param-reassign */
import createNewElement from './createNewElement.js';
import createPopup from './createPopup.js';
import { checkNameValidity, checkPriceValidity } from './checkFormValidity.js';
import manageError from './manageError.js';
import prettifyPrice from './prettifyPrice.js';

export default function createGoodCard(good, goodsArray) {
  const goodCard = createNewElement('div', 'good-card');
  const goodName = createNewElement('div', 'good-name', `<p>${good.name}</p>`);
  const goodPrice = createNewElement('div', 'good-price', `<p>${good.price}</p>`);
  const goodCardActions = createNewElement('div', 'good-card-actions-container');
  const goodEditBtn = createNewElement('div', 'good-edit-btn', '<p>&#9998;</p>');
  const goodRemoveBtn = createNewElement('div', 'good-remove-btn', '<p>&#10006;</p>');

  goodCardActions.appendChild(goodEditBtn);
  goodCardActions.appendChild(goodRemoveBtn);

  goodCard.appendChild(goodName);
  goodCard.appendChild(goodPrice);
  goodCard.appendChild(goodCardActions);

  // навешиваем обработчики на кнопки
  // по кнопке редактировать создаем и добавляем попап на страницу
  goodEditBtn.addEventListener('click', () => {
    const bodyEl = document.querySelector('body');
    const popup = createPopup();
    bodyEl.insertBefore(popup, bodyEl.lastChild);
    const addingForm = popup.querySelector('.good-adding-form');
    const nameInput = popup.querySelector('.good-name-field');
    const priceInput = popup.querySelector('.good-price-field');
    const resetBtn = popup.querySelector('.good-reset-btn');
    nameInput.value = good.name;
    const uglyPrice = good.price.replace(/\s+/g, '');
    priceInput.value = uglyPrice;
    // по кнопке сабмита проверяем форму
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
        // меняем данные товара и заменяем даные в массиве, localStorage и на странице
        const oldGoodIndex = goodsArray.indexOf(good);
        good.name = nameInput.value;
        const prettyPrice = prettifyPrice(priceInput.value);
        good.price = prettyPrice;
        goodsArray.splice(oldGoodIndex, 1, good);
        const goodString = JSON.stringify(good);
        localStorage[good.id] = goodString;
        goodName.innerHTML = `<p>${good.name}</p>`;
        goodPrice.innerHTML = `<p>${good.price}</p>`;
        popup.remove();
      }
    });
    resetBtn.addEventListener('click', () => {
      popup.remove();
    });
  });
  // по кнопке удалить удаляем товар со страницы, из массива и из localStorage
  goodRemoveBtn.addEventListener('click', () => {
    goodCard.remove();
    goodsArray.splice(goodsArray.indexOf(good), 1);
    localStorage.removeItem(good.id);
  });
  return goodCard;
}
