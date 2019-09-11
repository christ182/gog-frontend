import { lazy } from 'react';

const privateRoutes = [
  // insert routes visible to everyone. follow the example below
  // {
  //   name: 'Dashboard',
  //   path: '/dashboard',
  //   exact: true,
  //   component: lazy(() => import('containers/dashboard/Dashboard')),
  // },
  {
    name: 'Game',
    path: '/game-of-the-generals',
    exact: true,
    component: lazy(() => import('containers/game/Game')),
  },
];

export default privateRoutes;
