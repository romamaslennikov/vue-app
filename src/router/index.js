import Vue from 'vue';
import Router from 'vue-router';

import routes from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
  routes,
});

router.afterEach(() => {
  if (!window.PRERENDER_INJECTED) {
    const spinner = document.getElementById('spinner');

    if (spinner) {
      spinner.classList.add('-hide');
    }
  }
});

export default router;
