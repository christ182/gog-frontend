import { lazy } from 'react';

const publicRoutes = [
  // insert routes only accessible after authentication. follow the example below
  {
    name: 'Home',
    path: '/home',
    exact: true,
    component: lazy(() => import('containers/home/Home')),
  },
];

export default publicRoutes;
