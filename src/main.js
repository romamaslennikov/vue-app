import { createApp } from 'vue';
import Vue3TouchEvents from 'vue3-touch-events';
import vClickOutside from 'click-outside-vue3';
import vueEmitter from './utils/emitter';
import App from './App.vue';
import router from './router';
import store from './stores';
import './styles/index.scss';
import globalComponents from './components/global-components';

const app = createApp(App);

globalComponents(app);

app
  .provide('eventHub', vueEmitter)
  .use(store)
  .use(router)
  .use(vClickOutside)
  .use(Vue3TouchEvents)
  .mount('#app');
