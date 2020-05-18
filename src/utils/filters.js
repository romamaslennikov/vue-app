import Vue from 'vue';
import Typograf from 'typograf';

const tp = new Typograf({ locale: ['ru', 'en-US'] });

Vue.filter('typograf', (str) => tp.execute(str));
