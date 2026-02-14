import React from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { HashRouter } from 'react-router-dom';

import { ModalsProvider } from './providers/ModalsProvider';
import { UIProvider } from './providers/UIProvider';
import { AppRouter } from './router';

const client = new QueryClient();

export const App: React.FC = () => (
  <HashRouter>
    <QueryClientProvider client={client}>
      <UIProvider>
        <ModalsProvider>
          <AppRouter />
        </ModalsProvider>
      </UIProvider>
    </QueryClientProvider>
  </HashRouter>
);
