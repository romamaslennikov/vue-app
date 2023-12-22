import { createRouter, createWebHistory } from 'vue-router';
import { getToken } from '@/utils/auth';
import home from '@/router/routes/home';

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
  routes: [
    // main layout
    {
      path: '/',
      name: 'default-layout',
      component: () => import('@/layouts/Default.vue'),
      children: [
        ...home,
      ],
    },

    // full layout
    {
      path: '/',
      name: 'full-layout',
      component: () => import('@/layouts/Full.vue'),
      children: [],
    },

    // 404
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
});

router
  .beforeEach((to, _, next) => {
    const isLoggedIn = getToken();

    const { meta } = to;

    if (meta.redirectIsLoggedIn && isLoggedIn) {
      next('/');
    }

    return next();
  });

export default router;
