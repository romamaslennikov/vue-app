import { createPinia } from 'pinia';
import persistedstate from 'pinia-persistedstate';

const store = createPinia();

store.use(
  persistedstate({
    key: import.meta.env.VITE_APP_STATE_KEY,
    // paths: ['dataStore', 'dataStore.count']  // Keep state, use module id, or state
  }),
);

export default store;
