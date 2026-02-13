import { RouteObject } from 'react-router-dom';

import { HomePage } from '@pages/Home';
import { LoginPage } from '@pages/Login';
import { NotFoundPage } from '@pages/NotFound';
import { AppRoutes, RoutePath } from '@shared/constants/urls';

import { Layout } from '../../layouts/Layout';

export const routeConfig: Record<AppRoutes, RouteObject> = {
  [AppRoutes.ROOT]: {
    path: RoutePath.ROOT,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.LOGIN,
    element: <LoginPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.NOT_FOUND,
    element: <NotFoundPage />,
  },
};
