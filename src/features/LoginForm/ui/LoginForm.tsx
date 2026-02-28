import React, { useEffect } from 'react';

import { Form, Input, Typography, Card } from 'antd';

import { requiredField } from '@shared/constants/validate';

import { useLogin } from '../model';

import { LoginFormStyled, WrapperStyled, SubmitButton } from './LoginForm.styled';

import type { FormValues } from '../lib/schema';

export const LoginForm: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const { mutate: onLogin, isLoading, error } = useLogin();

  const onFinish = ({ login, password }: FormValues) => {
    onLogin({
      login: login.trim(),
      password: password.trim(),
    });
  };

  useEffect(() => {
    if (error && error instanceof Error) {
      form.setFields([
        { name: 'login', errors: [''] },
        { name: 'password', errors: [error.message] },
      ]);
    }
  }, [error, form]);

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
