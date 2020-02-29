import axios from 'axios';
import { getToken } from '@/utils/auth';

const store = require('../store');

const BASE_API = process.env.VUE_APP_NODE_ENV === 'production'
  ? process.env.VUE_APP_BASE_API : process.env.VUE_APP_BASE_API_DEV;

const service = axios.create({
  baseURL: BASE_API,
  timeout: 15000,
});

service.interceptors.request.use((config) => {
  const conf = config;

  conf.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  if (store.default.getters.token) {
    conf.headers['X-Auth-Token'] = getToken();
  }

  return conf;
}, (error) => {
  Promise.reject(error);
});

service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.error === 404) { // токен не валиден
      store.default.dispatch('LogOut');

      return Promise.reject(new Error('error'));
    }
    return res;
  },
  (error) => Promise.reject(error),
);

export { BASE_API };

export default service;
