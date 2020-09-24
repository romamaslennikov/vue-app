const routes = [
  {
    path: '/',
    component: () => import('../layouts/Layout'),
    children: [
      { path: '', name: 'home', component: () => import('../views/Home') },
    ],
  },
  {
    path: '*',
    component: () => import('../layouts/Layout'),
    children: [
      { path: '', component: () => import('../views/Home') },
    ],
  },
];

export default routes;
