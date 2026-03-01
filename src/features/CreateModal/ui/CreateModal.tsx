import React from 'react';

import { Modal, Form, Input } from 'antd';

import { requiredField, requiredUrl } from '@shared/constants/validate';
import { isError } from '@shared/lib/utils/isError';

import { useCreate } from '../model/hooks/useCreate';

import type { FormValues } from '../lib/schema';
import type { ICreateModalProps } from '@shared/types/modals.types';

export const CreateModal: React.FC<ICreateModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm<FormValues>();
  const { mutate: onCreate, isLoading } = useCreate();

  const handleCreate = async () => {
    try {
      const { name, avatar } = await form.validateFields();
      onCreate({
        name: name.trim(),
        avatar: avatar.trim(),
      });
    } catch (err) {
      isError(err) && console.error(err?.message);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleCreate}
      okText="Создать"
      cancelText="Отмена"
      title="Создание пользователя"
      okButtonProps={{ disabled: isLoading, loading: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <Form form={form} layout="vertical" autoComplete="off" disabled={isLoading}>
        <Form.Item label="Имя" name="name" rules={requiredField}>
          <Input />
        </Form.Item>
        <Form.Item label="Ссылка на аватарку" name="avatar" rules={requiredUrl}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
