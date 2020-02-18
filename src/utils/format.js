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

export default {
  capitalize,
  toNumber,
  toAlphabet,
};
