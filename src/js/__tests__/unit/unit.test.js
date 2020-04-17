import { checkNameValidity, checkPriceValidity } from '../../checkFormValidity.js';

test.each([
  ['true for valid name', 'iPhone', true],
  ['false for invalid name', '', false],
])(('should be %s'), (_, input, expected) => {
  const received = checkNameValidity(input);
  expect(received).toBe(expected);
});

test.each([
  ['true for valid price', '362835', true],
  ['false for invalid price', '0', false],
])(('should be %s'), (_, input, expected) => {
  const received = checkPriceValidity(input);
  expect(received).toBe(expected);
});
