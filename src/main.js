import { createApp } from 'vue';
import Vue3TouchEvents from 'vue3-touch-events';
import vClickOutside from 'click-outside-vue3';
import Notifications from '@kyvg/vue3-notification';
import vueEmitter from './utils/emitter';
import App from './App.vue';
import router from './router';
import store from './stores';

// global CSS
import 'normalize.css/normalize.css';
import './styles/layout.sass';

createApp(App)
  .provide('eventHub', vueEmitter)
  .use(store)
  .use(router)
  .use(vClickOutside)
  .use(Notifications)
  .use(Vue3TouchEvents)
  .mount('#app');
