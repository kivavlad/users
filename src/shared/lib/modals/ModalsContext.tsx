import React, { createContext, useState, useCallback } from 'react';
import type { IModalsContext, ModalsMap, ModalState } from '@shared/types/modals.types';

export const ModalsContext = createContext<IModalsContext | null>(null);

interface IProps { 
  children: React.ReactNode 
}

export const ModalsProvider: React.FC<IProps> = ({ children }) => {
  const [modals, setModals] = useState<ModalsMap>({} as ModalsMap);
  const [modalState, setModalState] = useState<ModalState>({});

  const registerModals = useCallback((newModals: Partial<ModalsMap>) => {
    setModals((prev) => ({
      ...prev,
      ...newModals
    }));
  }, []);

  const isOpen = useCallback((name: keyof ModalsMap) => {
    return Boolean(modalState[name]?.isOpen);
  }, [modalState]);

  const openModal = useCallback(<T extends keyof ModalsMap>(
    name: T,
    props?: any
  ) => {
    setModalState((prev) => ({ 
      ...prev,
      [name]: { isOpen: true, props } 
    }));
  }, []);

  const closeModal = useCallback((name: keyof ModalsMap) => {
    setModalState((prev) => ({
      ...prev,
      [name]: { isOpen: false, props: undefined } 
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
        
        const ModalComponent = modals[name as keyof ModalsMap];
        if (!ModalComponent) return null;
        
        return (
          <ModalComponent
            key={name}
            open={state.isOpen}
            onClose={() => closeModal(name as keyof ModalsMap)}
            {...state.props}
          />
        );
      })}
    </ModalsContext.Provider>
  );
};
