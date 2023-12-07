import Cookies from 'js-cookie';

const tokenKey = import.meta.env.VITE_APP_TOKEN_KEY;
const isDev = import.meta.env.DEV;
const secure = !isDev;

export function getToken() {
  return Cookies.get(tokenKey);
}

export function setToken(token) {
  if (window.localStorage?.getItem('remember')) {
    Cookies.set(tokenKey, token, { expires: 90, secure });

    return;
  }

  Cookies.set(tokenKey, token, { secure });
}

export function removeToken() {
  window.localStorage?.removeItem('remember');

  Cookies.remove(tokenKey);
}
