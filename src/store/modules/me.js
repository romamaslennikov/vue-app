import { signUp, signIn } from '@/api/login';
import { getProfile, logOut } from '@/api/me';
import { getToken, setToken, removeToken } from '@/utils/auth';
import router from '@/router';

/* eslint-disable */

const me = {
  namespaced: true,

  state: {
    token: getToken(),
    user: null,
  },

  getters: {
    token: (state) => state.token,
    user: (state) => state.user,
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },

    SET_TOKEN: (state, token) => {
      state.token = token;

      setToken(token);
    },

    REMOVE_TOKEN: (state) => {
      state.token = null;

      removeToken();
    },
  },

  actions: {
    GetProfile({ commit }) {
      return new Promise((resolve, reject) => {
        getProfile()
          .then((response) => {
            if (response.error === 0) {
              commit('SET_USER', response.result);
            }

            resolve(response);
          });
      });
    },

    SignUp({ commit }, data) {
      return (async () => signUp(data))();
    },

    SignIn({ commit }, data) {
      return (async () => signIn(data))();
    },

    LogOut({ commit }, data) {
      console.log('---', 'LogOut');

      if (data) {
        (document.getElementById('spinner')).classList.remove('-hide');

        logOut()
          .then(() => {
            commit('REMOVE_TOKEN');

            commit('SET_USER', null);

            router.push('/auth/sign_in');

            (document.getElementById('spinner')).classList.add('-hide');
          });
      } else {
        commit('REMOVE_TOKEN');

        commit('SET_USER', null);

        router.push('/auth/sign_in');
      }
    },
  },
};

export default me;
