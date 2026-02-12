import React, { useEffect } from 'react';
import { ModalsProvider as SharedModalsProvider } from '@shared/lib/modals';
import { useModals } from '@shared/hooks/useModals';

import { CreateModal } from '@features/CreateModal';

export const modals = {
  createUser: CreateModal,
};

const ModalsRegistry: React.FC = () => {
  const { registerModals } = useModals();
  
  useEffect(() => {
    registerModals(modals);
  }, [registerModals]);
  
  return null;
};

interface IProps { 
  children: React.ReactNode 
}

export const ModalsProvider: React.FC<IProps> = ({ children }) => (
  <SharedModalsProvider>
    <ModalsRegistry />
    {children}
  </SharedModalsProvider>
);
