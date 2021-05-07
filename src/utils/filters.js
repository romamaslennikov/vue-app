import Vue from 'vue';
import Typograf from 'typograf';

const tp = new Typograf({ locale: ['ru', 'en-US'] });

Vue.filter('typograf', (str) => tp.execute(str));

Vue.filter('formatNumber', (val) => `${val}`.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));

Vue.filter('declOfNum', (val, number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];

  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
});

export default tp;
