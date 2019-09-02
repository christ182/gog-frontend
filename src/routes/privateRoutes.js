import { lazy } from 'react';

const privateRoutes = [
  // insert routes visible to everyone. follow the example below
  {
    name: 'Dashboard',
    path: '/dashboard',
    exact: true,
    component: lazy(() => import('containers/dashboard/Dashboard'))
  },
  {
    name: 'Users',
    path: '/users',
    exact: true,
    component: lazy(() => import('containers/users/Users'))
  }
];

export default privateRoutes;
