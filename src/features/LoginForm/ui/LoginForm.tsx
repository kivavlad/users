import React, { useEffect, useCallback } from 'react';

import { Form, Input, Typography, Button, Card, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@shared/constants/urls';
import { requiredField } from '@shared/constants/validate';

import { FormValues } from '../lib/schema';
import { useLogin } from '../model';

import { LoginFormStyled, WrapperStyled, buttonStyled } from './LoginForm.styled';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<FormValues>();
  const { mutate: onLogin, isLoading, isError, isSuccess, error } = useLogin();

  const handleSubmit = useCallback(async () => {
    try {
      const { login, password } = await form.validateFields();
      onLogin({
        login: login.trim(),
        password: password.trim(),
      });
    } catch (error) {
      console.error(error);
    }
  }, [onLogin, form]);

  useEffect(() => {
    if (isError && error instanceof Error) {
      notification.error({
        message: error.message,
        placement: 'bottomRight',
      });
      form.setFields([
        { name: 'login', errors: [''] },
        { name: 'password', errors: [error.message] },
      ]);
    }
  }, [isError, error, form]);

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      void navigate(RoutePath.ROOT, { replace: true });
    }
  }, [isSuccess, form, navigate]);

  return (
    <LoginFormStyled>
      <Card>
        <WrapperStyled>
          <Typography>Авторизация</Typography>
          <Form form={form} layout="vertical" autoComplete="off" disabled={isLoading}>
            <Form.Item name="login" rules={requiredField}>
              <Input placeholder="Логин" />
            </Form.Item>
            <Form.Item name="password" rules={requiredField}>
              <Input.Password placeholder="Пароль" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading}
              className={buttonStyled}
              loading={isLoading}
              onClick={handleSubmit}
            >
              Войти
            </Button>
          </Form>
        </WrapperStyled>
      </Card>
    </LoginFormStyled>
  );
};
