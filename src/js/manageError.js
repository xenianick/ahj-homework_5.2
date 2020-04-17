import createNewElement from './createNewElement.js';

export default function manageError(element, form, text) {
  const error = createNewElement('div', 'error-container', `<p>${text}</p>`);
  if (!form.contains(error)) {
    element.after(error);
  }
  element.addEventListener('focus', () => {
    if (form.contains(error)) {
      error.remove();
    }
  });
}
