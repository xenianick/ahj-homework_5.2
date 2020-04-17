import createNewElement from './createNewElement.js';

export default function createPopup() {
  const goodAddingPopup = createNewElement('div', 'good-adding-popup');
  const goodAddingForm = createNewElement('form', 'good-adding-form');
  goodAddingForm.noValidate = true;

  const goodNameFieldHeader = createNewElement('div', 'good-name-field-header', '<p>Название</p>');
  const goodNameFieldInput = createNewElement('input', 'good-name-field');
  goodNameFieldInput.required = true;
  goodAddingForm.appendChild(goodNameFieldHeader);
  goodAddingForm.appendChild(goodNameFieldInput);

  const goodPriceFieldHeader = createNewElement('div', 'good-price-price-header', '<p>Стоимость</p>');
  const goodPriceFieldInput = createNewElement('input', 'good-price-field');
  goodPriceFieldInput.required = true;
  goodAddingForm.appendChild(goodPriceFieldHeader);
  goodAddingForm.appendChild(goodPriceFieldInput);

  const goodSaveBtn = createNewElement('button', 'good-save-btn btn', 'Сохранить');
  const goodResetBtn = createNewElement('button', 'good-reset-btn btn', 'Отмена');
  goodResetBtn.type = 'reset';
  goodAddingForm.appendChild(goodSaveBtn);
  goodAddingForm.appendChild(goodResetBtn);

  goodAddingPopup.appendChild(goodAddingForm);

  return goodAddingPopup;
}
