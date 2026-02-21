import React, { useEffect } from 'react';

import { Form, Input, Typography, Card, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@shared/constants/urls';
import { requiredField } from '@shared/constants/validate';

import { useLogin } from '../model';

import { LoginFormStyled, WrapperStyled, SubmitButton } from './LoginForm.styled';

import type { FormValues } from '../lib/schema';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<FormValues>();
  const { mutate: onLogin, isLoading, isError, isSuccess, error } = useLogin();

  const onFinish = async (values: FormValues) => {
    onLogin({
      login: values.login.trim(),
      password: values.password.trim(),
    });
  };

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
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            disabled={isLoading}
            onFinish={onFinish}
          >
            <Form.Item name="login" rules={requiredField}>
              <Input placeholder="Логин" />
            </Form.Item>
            <Form.Item name="password" rules={requiredField}>
              <Input.Password placeholder="Пароль" />
            </Form.Item>
            <SubmitButton type="primary" htmlType="submit" disabled={isLoading} loading={isLoading}>
              Войти
            </SubmitButton>
          </Form>
        </WrapperStyled>
      </Card>
    </LoginFormStyled>
  );
};
