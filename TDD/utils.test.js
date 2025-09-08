const { capitalize, reverseString, calculator, caesarCipher, analyzeArray } = require('./utils');

test('capitalize first letter', () => {
  expect(capitalize('hello')).toBe('Hello');
  expect(capitalize('java')).toBe('Java');
  expect(capitalize('')).toBe('');
});

test('reverse string', () => {
  expect(reverseString('hello')).toBe('olleh');
  expect(reverseString('Java')).toBe('avaJ');
  expect(reverseString('')).toBe('');
});

test('calculator operations', () => {
  expect(calculator.add(2, 3)).toBe(5);
  expect(calculator.subtract(5, 2)).toBe(3);
  expect(calculator.multiply(4, 3)).toBe(12);
  expect(calculator.divide(10, 2)).toBe(5);
});

test('caesar cipher', () => {
  expect(caesarCipher('xyz', 3)).toBe('abc');
  expect(caesarCipher('HeLLo', 3)).toBe('KhOOr');
  expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
});

test('analyze array', () => {
  const result = analyzeArray([1, 8, 3, 4, 2, 6]);
  expect(result).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6
  });
});
