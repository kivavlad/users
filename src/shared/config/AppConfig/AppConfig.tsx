import { RouteProps } from 'react-router-dom';
import { AppRoutes, RoutePath } from '@shared/constants/urls';

import { LoginPage } from '@pages/Login';
import { HomePage } from '@pages/Home';
import { NotFoundPage } from '@pages/NotFound';

export type AppRouteProps = RouteProps & {
  isAuthOnly?: boolean;
}

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
   [AppRoutes.ROOT]: {
    path: RoutePath.ROOT,
    element: <HomePage />,
    isAuthOnly: true
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.LOGIN,
    element: <LoginPage />,
    isAuthOnly: false
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.NOT_FOUND,
    element: <NotFoundPage />,
    isAuthOnly: false
  },
};