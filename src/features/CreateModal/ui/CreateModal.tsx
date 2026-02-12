import React, { useCallback, useEffect } from "react";
import { Modal, Form, Input, notification } from "antd";
import { useModals } from "@shared/hooks/useModals";
import { useCreate } from "../model/hooks/useCreate";
import { nameRules, avatarRules } from "../lib/rules";
import { FormValues } from "../lib/values";
import { InputStyled } from './CreateModal.styled';

export const CreateModal: React.FC = () => {
  const { isOpen, closeModal } = useModals();
  const open = isOpen('createUser');

  const [form] = Form.useForm<FormValues>();
  const { mutate: onCreate, isLoading, isSuccess, isError } = useCreate();

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: 'Новый пользователь успешно создан',
        placement: 'bottomRight',
      });
      closeModal('createUser');
    }
    
    if (isError) {
      notification.error({
        message: 'Ошибка создания пользователя',
        placement: 'bottomRight',
      });
    }
  }, [isSuccess, isError, closeModal]);

  const handleClose = useCallback(() => {
    closeModal('createUser');
  }, [isLoading, closeModal]);

  const handleCreate = useCallback(async () => {
    try {
      const values = await form.validateFields();
      onCreate(values);
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  }, [form, onCreate]);

  return (
    <Modal 
      open={open} 
      onCancel={handleClose}
      onOk={handleCreate}
      okText="Создать"
      cancelText="Отмена"
      title="Создание пользователя"
      confirmLoading={isLoading}
      okButtonProps={{ disabled: isLoading, loading: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        disabled={isLoading}
      >
        <InputStyled>
          <Form.Item
            label="Имя"
            name="name"
            rules={nameRules}
          >
            <Input />
          </Form.Item>
        </InputStyled>

        <InputStyled>
          <Form.Item
            label="Ссылка на аватарку"
            name="avatar"
            rules={avatarRules}
          >
            <Input />
          </Form.Item>
        </InputStyled>
      </Form>
    </Modal>
  );
};
