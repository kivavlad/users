import React, { useEffect } from 'react';

import { CreateModal } from '@features/CreateModal';
import { EditModal } from '@features/EditModal';
import { useModals } from '@shared/hooks/useModals';
import { ModalsProvider as SharedModalsProvider } from '@shared/lib/modals';
import type { ModalsMap } from '@shared/types/modals.types';

export const modals: ModalsMap = {
  createUser: CreateModal,
  editUser: EditModal,
};

const ModalsRegistry: React.FC = () => {
  const { registerModals } = useModals();

  useEffect(() => {
    registerModals(modals);
  }, [registerModals]);

  return null;
};

interface IProps {
  children: React.ReactNode;
}

export const ModalsProvider: React.FC<IProps> = ({ children }) => (
  <SharedModalsProvider>
    <ModalsRegistry />
    {children}
  </SharedModalsProvider>
);
