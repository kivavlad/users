import React from 'react';

export interface IBaseModalProps {
  open: boolean;
  onClose: () => void;
}

export type ModalComponent = React.ComponentType<IBaseModalProps>;
export type ModalsMap = Record<string, ModalComponent>;
export type ModalState = Record<string, { 
  isOpen: boolean;
  props?: Omit<IBaseModalProps, 'open' | 'onClose'>
}>;

export interface IModalsContext {
  isOpen: (name: string) => boolean;
  openModal: (name: string, props?: Omit<IBaseModalProps, 'open' | 'onClose'>) => void;
  closeModal: (name: string) => void;
  closeAll: () => void;
  registerModals: (modals: ModalsMap) => void;
}
