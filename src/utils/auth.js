import Cookies from 'js-cookie';

const TokenKey = process.env.VUE_APP_TOKEN_KEY;

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  if (window.localStorage.getItem('remember')) {
    return Cookies.set(TokenKey, token, { expires: 90, secure: true });
  }

  return Cookies.set(TokenKey, token, { secure: true });
}

export function removeToken() {
  window.localStorage.removeItem('remember');

  return Cookies.remove(TokenKey);
}
