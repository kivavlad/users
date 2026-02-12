import React, { useCallback, useEffect } from 'react';

import { Modal, Form, Input, notification, Button } from 'antd';

import { requiredField, requiredUrl } from '@shared/constants/validate';
import type { IEditModalProps } from '@shared/types/modals.types';

import type { FormValues } from '../lib/schema';
import { useGetById, useEdit, useRemove } from '../model';

import { FooterStyled, DeleteButton } from './EditModal.styled';

export const EditModal: React.FC<IEditModalProps> = ({ id, open, onClose }) => {
  const [form] = Form.useForm<FormValues>();

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: userError,
  } = useGetById(id!);

  const {
    mutate: onEdit,
    isLoading: isEditing,
    isSuccess: isEditSuccess,
    isError: isEditError,
    error: editError,
  } = useEdit();

  const {
    mutate: onRemove,
    isLoading: isDeleting,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
  } = useRemove();

  const isAnyLoading = isLoadingUser || isEditing || isDeleting;

  const handleUpdate = useCallback(async () => {
    if (!user) return void 0;
    try {
      const { name, avatar } = await form.validateFields();
      onEdit({
        ...user,
        name: name.trim(),
        avatar: avatar.trim(),
      });
    } catch (err) {
      console.error(err);
    }
  }, [user, form, onEdit]);

  const handleRemove = useCallback(() => {
    if (!id) return void 0;
    onRemove(id);
  }, [onRemove, id]);

  const handleCancel = useCallback(() => {
    if (isAnyLoading) return void 0;
    onClose();
  }, [onClose, isAnyLoading]);

  useEffect(() => {
    if (user && open) {
      form.setFieldsValue({
        id,
        name: user.name,
        avatar: user.avatar,
      });
    }
  }, [user, id, form, open]);

  useEffect(() => {
    if (isEditSuccess) {
      notification.success({
        message: 'Пользователь обновлен',
        placement: 'bottomRight',
      });
      onClose();
    }
  }, [isEditSuccess, onClose]);

  useEffect(() => {
    if (isDeleteSuccess) {
      notification.success({
        message: 'Пользователь удален',
        placement: 'bottomRight',
      });
      onClose();
    }
  }, [isDeleteSuccess, onClose]);

  useEffect(() => {
    const error = userError || editError || deleteError;

    if (error) {
      let message = 'Ошибка';

      if (isErrorUser) {
        message = 'Не удалось загрузить данные пользователя';
      } else if (isEditError) {
        message = 'Не удалось обновить пользователя';
      } else if (isDeleteError) {
        message = 'Не удалось удалить пользователя';
      }

      notification.error({
        message,
        placement: 'bottomRight',
      });
    }
  }, [userError, editError, deleteError, isErrorUser, isEditError, isDeleteError]);

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title="Редактирование пользователя"
      closable={!isAnyLoading}
      keyboard={!isAnyLoading}
      loading={isLoadingUser}
      footer={() => (
        <FooterStyled>
          <DeleteButton danger onClick={handleRemove} loading={isDeleting} disabled={isAnyLoading}>
            Удалить
          </DeleteButton>
          <Button onClick={handleCancel} disabled={isEditing || isDeleting}>
            Отмена
          </Button>
          <Button type="primary" onClick={handleUpdate} loading={isEditing} disabled={isAnyLoading}>
            Сохранить
          </Button>
        </FooterStyled>
      )}
    >
      <Form form={form} layout="vertical" autoComplete="off" disabled={isAnyLoading}>
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
