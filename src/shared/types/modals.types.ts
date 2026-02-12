export interface IBaseModalProps {
  open: boolean;
  onClose: () => void;
}

export interface IEditModalProps extends IBaseModalProps {
  id?: string;
}

export interface ICreateModalProps extends IBaseModalProps {}

export type ModalPropsMap = {
  createUser: ICreateModalProps;
  editUser: IEditModalProps;
};

export type ModalName = keyof ModalPropsMap;

export type ModalsMap = {
  [K in ModalName]: React.ComponentType<ModalPropsMap[K]>;
};

export type ModalState = {
  [K in ModalName]?: {
    isOpen: boolean;
    props?: Omit<ModalPropsMap[K], keyof IBaseModalProps>;
  };
};

export interface IModalsContext {
  isOpen: (name: ModalName) => boolean;
  openModal: <K extends ModalName>(
    name: K, 
    props?: Omit<ModalPropsMap[K], keyof IBaseModalProps>
  ) => void;
  closeModal: (name: ModalName) => void;
  closeAll: () => void;
  registerModals: (modals: Partial<ModalsMap>) => void;
}
