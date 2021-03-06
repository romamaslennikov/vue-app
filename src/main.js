import Vue from 'vue';
import VueNoty from 'vuejs-noty';
import Vuelidate from 'vuelidate';
import Meta from 'vue-meta';
import svg4everybody from 'svg4everybody';
import { VLazyImagePlugin } from 'v-lazy-image';
import App from './App.vue';
import router from './router';
import store from './store';
import './utils/filters';

import 'vuejs-noty/dist/vuejs-noty.css';
import 'normalize.css/normalize.css'; //  reset CSS
import '@/styles/layout.sass'; // global CSS

import { isIE11 } from './utils/device';

require('intersection-observer'); // for svg

if (isIE11) { // ie11 support
  require('es6-shim'); // eslint-disable-line
  require('element-closest-polyfill'); // eslint-disable-line
  document.write('<script src="https://cdn.jsdelivr.net/gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.min.js"></script>'); // css vars
}

Vue.config.productionTip = false;

Vue.use(VueNoty);
Vue.use(Vuelidate);
Vue.use(Meta);
svg4everybody();
Vue.use(VLazyImagePlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
