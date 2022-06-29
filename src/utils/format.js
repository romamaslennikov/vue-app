import Typograf from 'typograf';

const tp = new Typograf({ locale: ['ru', 'en-US'] });

export function capitalize(str) {
  return str.charAt(0)
    .toUpperCase() + str.slice(1);
}

export function toNumber(value) {
  return value.toString()
    .replace(/[^0-9]/g, '');
}

export function toAlphabet(value) {
  return value.replace(/[^A-Za-zА ]/g, '');
}

export function formatNumber(value) {
  return `${value}`.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
}

export function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];

  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

export function typograf(value) {
  return tp.execute(value);
}
