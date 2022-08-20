const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('../layouts/Layout.vue'),
    children: [
      // home
      {
        path: '',
        name: 'home',
        component: () => import('../views/Home.vue'),
      },

      // about
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/About.vue'),
      },
    ],
  },

  // 404
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

export default routes;
