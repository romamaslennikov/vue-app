import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// Modules
import app from './modules/app';
import me from './modules/me';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    me,
  },
  strict: process.env.DEV,
  plugins: [createPersistedState({
    key: process.env.VUE_APP_STATE_KEY,
  })],
});

export default store;
