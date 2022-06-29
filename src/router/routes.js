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
        component: () => import(/* webpackChunkName: 'home' */'../views/Home.vue'),
      },

      // about
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: 'about' */'../views/About.vue'),
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
