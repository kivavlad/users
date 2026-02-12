import { RouteProps } from 'react-router-dom';

import { HomePage } from '@pages/Home';
import { LoginPage } from '@pages/Login';
import { NotFoundPage } from '@pages/NotFound';
import { AppRoutes, RoutePath } from '@shared/constants/urls';

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.ROOT]: {
    path: RoutePath.ROOT,
    element: <HomePage />,
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
