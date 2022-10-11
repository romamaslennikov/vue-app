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
  strict: import.meta.env.DEV,
  plugins: [createPersistedState({
    key: import.meta.env.VITE_APP_STATE_KEY,
  })],
});
