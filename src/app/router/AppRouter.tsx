import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { routeConfig } from '@app/router/config';

import { RequireAuth } from './RequireAuth';

import type { RouteObject } from 'react-router-dom';

export const AppRouter: React.FC = () => {
  const createRoute = (route: RouteObject) => {
    if (route.children) {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<RequireAuth>{route.element}</RequireAuth>}
        >
          {route.children.map(createRoute)}
        </Route>
      );
    }

    return (
      <Route
        key={route.path ?? 'index'}
        path={route.path}
        index={route.index}
        element={<RequireAuth>{route.element}</RequireAuth>}
      />
    );
  };

  return <Routes>{Object.values(routeConfig).map(createRoute)}</Routes>;
};
