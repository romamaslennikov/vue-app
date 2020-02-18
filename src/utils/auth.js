import Cookies from 'js-cookie';

const TokenKey = 'X-Auth-Token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  if (window.localStorage.getItem('remember')) {
    return Cookies.set(TokenKey, token, { expires: 90 });
  }

  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  window.localStorage.removeItem('remember');

  return Cookies.remove(TokenKey);
}
