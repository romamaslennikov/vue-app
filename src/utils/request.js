import { notify } from '@kyvg/vue3-notification';
import axios from 'axios';
import { getToken } from '@/utils/auth';

const BASE_API = import.meta.env.NODE_ENV === 'production'
  ? import.meta.env.VITE_BASE_API : import.meta.env.VITE_BASE_API_DEV;

const service = axios.create({
  baseURL: BASE_API,
  timeout: 10000,
});

service.interceptors.request.use((config) => {
  const conf = config;

  conf.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  const token = getToken();

  if (token) {
    conf.headers['X-Auth-Token'] = token;
  }

  return conf;
}, (error) => {
  if (!window.PRERENDER_INJECTED) {
    notify(`<b>Упс. Что-то пошло не так, повторите позже.</b> <div>${error}</div>`);
  }

  Promise.reject(error);
});

service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (window.PRERENDER_INJECTED) return null;

    const { response } = error;

    const { request } = error;

    if (response) {
      // client received an error response (5xx, 4xx)
      if (response?.status === 401) {
        const r = response?.data;

        notify(`<b>Error. </b> <div>${r && r?.name}</div><div>${r && r?.message}</div>`);

        return Promise.reject(r);
      }

      if (response?.status < 500) {
        const r = response?.data;

        if (Array.isArray(r)) {
          r.forEach((item) => {
            notify(`<b>Error. </b> <div>${item?.message}</div>`);
          });
        } else {
          notify(`<b>Error. </b> <div>${r && r?.name}</div><div>${r && r?.message}</div>`);
        }

        return Promise.reject(new Error(r));
      }

      if (response?.status >= 500) {
        notify(`<b>Oops. </b> <div>${error}</div>`);
      }
    } else if (request) {
      // client never received a response, or request never left
      notify(`<b>Error. </b> <div>${request}</div>`);
    } else {
      notify(`<b>Error. </b> <div>${error}</div>`);
    }

    return Promise.reject(new Error(response));
  },
);

export { BASE_API };

export default service;
