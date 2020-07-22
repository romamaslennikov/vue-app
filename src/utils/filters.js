import Vue from 'vue';
import Typograf from 'typograf';

const tp = new Typograf({ locale: ['ru', 'en-US'] });

Vue.filter('typograf', (str) => tp.execute(str));

Vue.filter('formatNumber', (val) => `${val}`.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
