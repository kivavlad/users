import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig, AppRouteProps } from '@shared/config/AppConfig/AppConfig';
import { RequireAuth } from './RequireAuth';

export const AppRouter: React.FC = () => {
  const renderRoute = (route: AppRouteProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.isAuthOnly ? (
          <RequireAuth>
            { route.element }
          </RequireAuth>
        ) : route.element}
      />
    );
  };

  return (
    <Routes>
      {Object.values(routeConfig).map(renderRoute)}
    </Routes>
  );
};