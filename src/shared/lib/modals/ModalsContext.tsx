import React, { createContext, useState, useCallback } from 'react';
import type { IBaseModalProps, IModalsContext, ModalsMap, ModalState } from './types';

export const ModalsContext = createContext<IModalsContext | null>(null);

interface IProps { 
  children: React.ReactNode 
}

export const ModalsProvider: React.FC<IProps> = ({ children }) => {
  const [modals, setModals] = useState<ModalsMap>({});
  const [modalState, setModalState] = useState<ModalState>({});

  const registerModals = useCallback((newModals: ModalsMap) => {
    setModals((prev) => ({
      ...prev,
      ...newModals
    }));
  }, []);

  const isOpen = useCallback((name: string) => {
    return Boolean(modalState[name]?.isOpen);
  }, [modalState]);

  const openModal = useCallback((name: string, props?: Omit<IBaseModalProps, 'open' | 'onClose'>) => {
    setModalState((prev) => ({ 
      ...prev,
      [name]: { isOpen: true, props } 
    }));
  }, []);

  const closeModal = useCallback((name: string) => {
    setModalState((prev) => ({
      ...prev,
      [name]: { isOpen: false, props: void 0 } 
    }));
  }, []);

  const closeAll = useCallback(() => {
    setModalState({});
  }, []);

  return (
    <ModalsContext.Provider 
      value={{
        isOpen,
        openModal,
        closeModal,
        closeAll,
        registerModals
      }}
    >
      {children}
      
      {Object.entries(modalState).map(([name, state]) => {
        if (!state?.isOpen) return null;
        
        const ModalComponent = modals[name];
        if (!ModalComponent) return null;
        
        return (
          <ModalComponent
            key={name}
            open={state.isOpen}
            onClose={() => closeModal(name)}
            {...state.props}
          />
        );
      })}
    </ModalsContext.Provider>
  );
};
