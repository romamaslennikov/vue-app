import { createApp } from 'vue';
import vClickOutside from 'click-outside-vue3';
import Notifications from '@kyvg/vue3-notification';
import App from './App.vue';
import router from './router';
import store from './store';

// global CSS
import 'normalize.css/normalize.css';
import '@/styles/layout.sass';

require('intersection-observer');

createApp(App)
  .use(store)
  .use(router)
  .use(vClickOutside)
  .use(Notifications)
  .mount('#app');
