import React from 'react';

import { Layout } from 'antd';
import { Route, Routes, RouteProps } from 'react-router-dom';

import { routeConfig } from '@shared/config/AppConfig/AppConfig';

import { RequireAuth } from './RequireAuth';

export const AppRouter: React.FC = () => {
  const renderRoute = (route: RouteProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={<RequireAuth>{route.element}</RequireAuth>}
      />
    );
  };

  return (
    <Layout>
      <Routes>{Object.values(routeConfig).map(renderRoute)}</Routes>
    </Layout>
  );
};
