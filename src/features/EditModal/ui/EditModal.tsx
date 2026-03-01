import React, { useEffect } from 'react';

import { Modal, Form, Input, Button } from 'antd';

import { requiredField, requiredUrl } from '@shared/constants/validate';
import { isError } from '@shared/lib/utils/isError';

import { useGetById, useEdit, useRemove } from '../model';

import { FooterStyled, DeleteButton } from './EditModal.styled';

import type { FormValues } from '../lib/schema';
import type { IEditModalProps } from '@shared/types/modals.types';

export const EditModal: React.FC<IEditModalProps> = ({ id, open, onClose }) => {
  const [form] = Form.useForm<FormValues>();

  const { data: user, isLoading: isLoadingUser } = useGetById(id!);
  const { mutate: onEdit, isLoading: isEditing } = useEdit();
  const { mutate: onRemove, isLoading: isDeleting } = useRemove();

  const isAnyLoading = isLoadingUser || isEditing || isDeleting;

  const handleCancel = () => {
    if (isEditing || isDeleting) return void 0;
    onClose();
  };

  const handleEdit = async () => {
    if (!user) return void 0;
    try {
      const { name, avatar } = await form.validateFields();
      onEdit({
        ...user,
        name: name.trim(),
        avatar: avatar.trim(),
      });
    } catch (err) {
      isError(err) && console.error(err?.message);
    }
  };

  const handleRemove = () => {
    if (!id) return void 0;
    onRemove(id);
  };

  useEffect(() => {
    if (user && open) {
      form.setFieldsValue({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      });
    }
  }, [user, form, open]);

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title="Редактирование пользователя"
      loading={isLoadingUser}
      footer={() => (
        <FooterStyled>
          <DeleteButton danger onClick={handleRemove} loading={isDeleting} disabled={isAnyLoading}>
            Удалить
          </DeleteButton>
          <Button onClick={handleCancel} disabled={isEditing || isDeleting}>
            Отмена
          </Button>
          <Button type="primary" onClick={handleEdit} loading={isEditing} disabled={isAnyLoading}>
            Сохранить
          </Button>
        </FooterStyled>
      )}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        disabled={isAnyLoading}
        onFinish={handleEdit}
      >
        <Form.Item label="id" name="id">
          <Input disabled />
        </Form.Item>
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
