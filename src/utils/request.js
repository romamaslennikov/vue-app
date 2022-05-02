import Vue from 'vue';
import VueNoty from 'vuejs-noty';
import axios from 'axios';
import { getToken } from '@/utils/auth';

Vue.use(VueNoty);

const store = require('../store');

const BASE_API = process.env.NODE_ENV === 'production'
  ? process.env.VUE_APP_BASE_API : process.env.VUE_APP_BASE_API_DEV;

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
    Vue.noty.error(`<b>Упс. Что-то пошло не так, повторите позже.</b> <div>${error}</div>`);
  }

  Promise.reject(error);
});

service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.error === 404) { // токен не валиден
      if (!window.PRERENDER_INJECTED) {
        Vue.noty.error(`<b>Упс. Что-то пошло не так, повторите позже.</b> <div>${res.error}</div>`);
      }

      store.default.dispatch('me/LogOut');

      return Promise.reject(new Error('error'));
    }
    return res;
  },
  (error) => {
    if (window.PRERENDER_INJECTED) return null;

    const { response } = error;

    const { request } = error;

    if (response) {
      // client received an error response (5xx, 4xx)
      if (response?.status === 401) {
        const r = response?.data;

        Vue.noty.error(`<b>Error. </b> <div>${r && r?.name}</div><div>${r && r?.message}</div>`);

        store.default.dispatch('me/LogOut', true);

        return Promise.reject(r);
      }

      if (response?.status < 500) {
        const r = response?.data;

        if (Array.isArray(r)) {
          r.forEach((item) => {
            Vue.noty.error(`<b>Error. </b> <div>${item?.message}</div>`);
          });
        } else {
          Vue.noty.error(`<b>Error. </b> <div>${r && r?.name}</div><div>${r && r?.message}</div>`);
        }

        return Promise.reject(new Error(r));
      }

      if (response?.status >= 500) {
        Vue.noty.error(`<b>Oops. </b> <div>${error}</div>`);
      }
    } else if (request) {
      // client never received a response, or request never left
      Vue.noty.error(`<b>Error. </b> <div>${request}</div>`);
    } else {
      Vue.noty.error(`<b>Error. </b> <div>${error}</div>`);
    }

    return Promise.reject(new Error(response));
  },
);

export { BASE_API };

export default service;
