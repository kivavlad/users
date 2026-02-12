import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { UIProvider } from './providers/UIProvider';
import { ModalsProvider } from './providers/ModalsProvider';
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
