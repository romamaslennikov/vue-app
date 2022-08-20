import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to) => {
    if (to.hash) {
      return {
        el: to.hash,
      };
    }

    return { top: 0 };
  },
  routes,
});

export default router;
