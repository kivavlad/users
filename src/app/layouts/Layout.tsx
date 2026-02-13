import React from 'react';

import { Outlet } from 'react-router-dom';

import { Head } from '@widgets/Head';

export const Layout: React.FC = () => (
  <>
    <Head />
    <Outlet />
  </>
);
