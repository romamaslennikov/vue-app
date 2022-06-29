import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// Modules
import app from './modules/app';
import me from './modules/me';

export default createStore({
  modules: {
    app,
    me,
  },
  strict: process.env.DEV,
  plugins: [createPersistedState({
    key: process.env.VUE_APP_STATE_KEY,
  })],
});
