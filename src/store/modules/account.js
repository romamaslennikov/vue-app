import { checkEmail, signUp, signIn } from '@/api/login';
import {
  getProfile, setProfile, logOut,
  requestPasswordReset, passwordReset, resendPassword,
} from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import router from '@/router';

/* eslint-disable */

const account = {
  state: {
    token: getToken(),
    user: null,
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

    RequestPasswordReset({ commit }, data) {
      return (async () => requestPasswordReset(data))();
    },

    PasswordReset({ commit }, data) {
      return (async () => passwordReset(data))();
    },

    ResendPassword({ commit }) {
      return (async () => resendPassword())();
    },

    SetProfile({ commit }, data) {
      return (async () => setProfile(data))();
    },

    CheckEmail({ commit }, data) {
      return (async () => checkEmail(data))();
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
          .then((r) => {
            commit('REMOVE_TOKEN');

            router.push('/auth/sign_in');

            (document.getElementById('spinner')).classList.add('-hide');
          });
      } else {
        commit('REMOVE_TOKEN');

        router.push('/auth/sign_in');
      }
    },
  },
};

export default account;
