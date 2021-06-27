const routes = [
  {
    path: '/',
    component: () => import('../layouts/Layout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('../views/Home.vue') },
    ],
  },
  {
    path: '*',
    component: () => import('../layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('../views/Home.vue') },
    ],
  },
];

export default routes;
