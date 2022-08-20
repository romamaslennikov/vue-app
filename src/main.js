import { createApp } from 'vue';
import vClickOutside from 'click-outside-vue3';
import Notifications from '@kyvg/vue3-notification';
import vueEmitter from './utils/emitter';
import App from './App.vue';
import router from './router';
import store from './store';

// global CSS
import 'normalize.css/normalize.css';
import './styles/layout.sass';

createApp(App)
  .provide('eventHub', vueEmitter)
  .use(store)
  .use(router)
  .use(vClickOutside)
  .use(Notifications)
  .mount('#app');
