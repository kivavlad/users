import { useContext } from 'react';
import { ModalsContext } from '@shared/lib/modals/ModalsContext';

export const useModals = () => {
  const context = useContext(ModalsContext);
  
  if (!context) {
    throw new Error('useModals должен использоваться внутри ModalsProvider');
  }
  
  return context;
};