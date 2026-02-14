import React, { useCallback, useEffect } from 'react';

import { Modal, Form, Input, notification } from 'antd';

import { requiredField, requiredUrl } from '@shared/constants/validate';
import type { ICreateModalProps } from '@shared/types/modals.types';

import type { FormValues } from '../lib/schema';
import { useCreate } from '../model/hooks/useCreate';

export const CreateModal: React.FC<ICreateModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm<FormValues>();
  const { mutate: onCreate, isLoading, isSuccess, isError } = useCreate();

  const handleCreate = useCallback(async () => {
    try {
      const { name, avatar } = await form.validateFields();
      onCreate({
        name: name.trim(),
        avatar: avatar.trim(),
      });
    } catch (error) {
      console.error(error);
    }
  }, [form, onCreate]);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: 'Новый пользователь создан',
        placement: 'bottomRight',
      });
      form.resetFields();
      onClose();
    }
  }, [isSuccess, form, onClose]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: 'Ошибка создания пользователя',
        placement: 'bottomRight',
      });
    }
  }, [isError]);

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
