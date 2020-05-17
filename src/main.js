import Vue from 'vue';
import VueScrollReveal from 'vue-scroll-reveal';
import modernizr from 'modernizr'; // eslint-disable-line
import Vuelidate from 'vuelidate';
import Meta from 'vue-meta';
import svg4everybody from 'svg4everybody';
import { VLazyImagePlugin } from 'v-lazy-image';
import App from './App.vue';
import router from './router';
import store from './store';

import 'normalize.css/normalize.css'; //  reset CSS
import '@/styles/layout.sass'; // for svg

import { isIE11 } from './utils/device'; // global CSS

require('intersection-observer');

if (isIE11) { // ie11 support
  require('es6-shim'); // eslint-disable-line
  require('element-closest-polyfill'); // eslint-disable-line
}

Vue.config.productionTip = false;

Vue.prototype.$webp = false;

modernizr.on('webp', (result) => {
  if (result) {
    Vue.prototype.$webp = true;
  } else {
    Vue.prototype.$webp = false;
  }
});

Vue.use(VueScrollReveal);
Vue.use(Vuelidate);
Vue.use(Meta);
svg4everybody();
Vue.use(VLazyImagePlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
