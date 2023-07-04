import { useNotification } from '@kyvg/vue3-notification';
import axios from 'axios';
import { getToken, removeToken } from '@/utils/auth';

const notification = useNotification();

const configNotify = {
  type: 'error',
  duration: 5000,
};

const BASE_API = import.meta.env.VITE_BASE_API;

const service = axios.create({
  baseURL: BASE_API,
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
    notification.notify({
      ...configNotify,
      text: 'Упс. Что-то пошло не так, повторите позже.',
    });
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

        notification.notify({
          ...configNotify,
          title: r?.name,
          text: r?.message,
        });

        if (getToken()) {
          removeToken();

          document.location.reload();
        }

        return Promise.reject(r);
      }

      if (response?.status < 500) {
        const r = response?.data;

        if (Array.isArray(r)) {
          r.forEach((item) => {
            notification.notify({
              ...configNotify,
              text: item?.message,
            });
          });
        } else {
          notification.notify({
            ...configNotify,
            title: r?.name,
            text: r?.message,
          });
        }

        return Promise.reject(new Error(r));
      }

      if (response?.status >= 500) {
        notification.notify({
          ...configNotify,
          title: 'Oops.',
          text: error,
        });
      }
    } else if (request) {
      // client never received a response, or request never left
      notification.notify({
        ...configNotify,
        title: 'Oops.',
        text: request,
      });
    } else {
      notification.notify({
        ...configNotify,
        title: 'Oops.',
        text: error,
      });
    }

    return Promise.reject(new Error(response));
  },
);

export { BASE_API };

export default service;
