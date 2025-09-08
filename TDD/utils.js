function capitalize(str) {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1);
}

function reverseString(str) {
  return str.split('').reverse().join('');
}

const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};

function caesarCipher(str, shift) {
  return str.split('').map(char => {
    const isUpper = char >= 'A' && char <= 'Z';
    const isLower = char >= 'a' && char <= 'z';

    if (isUpper) {
      return String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
    } else if (isLower) {
      return String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
    } else {
      return char;
    }
  }).join('');
}

function analyzeArray(arr) {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return {
    average: sum / arr.length,
    min,
    max,
    length: arr.length
  };
}

module.exports = {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray
};
