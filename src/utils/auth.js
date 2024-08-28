import Cookies from 'js-cookie';
import { TOKEN_KEY, IS_DEV } from '@/constants';

const secure = !IS_DEV;

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

export function setToken(token) {
  if (window.localStorage?.getItem('remember')) {
    Cookies.set(TOKEN_KEY, token, { expires: 90, secure });

    return;
  }

  Cookies.set(TOKEN_KEY, token, { secure });
}

export function removeToken() {
  window.localStorage?.removeItem('remember');

  Cookies.remove(TOKEN_KEY);
}
