import React from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import { ModalsProvider } from './providers/ModalsProvider';
import { UIProvider } from './providers/UIProvider';
import { AppRouter } from './router';

const client = new QueryClient();

export const App: React.FC = () => (
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <UIProvider>
        <ModalsProvider>
          <AppRouter />
        </ModalsProvider>
      </UIProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
