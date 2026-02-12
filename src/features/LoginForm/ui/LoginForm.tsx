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
    if (isError) {
      notification.error({
        message: error instanceof Error ? error.message : 'Ошибка авторизации',
        placement: 'bottomRight',
      });
    }
  }, [isError, error]);

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
              <Input placeholder="Логин" status={error ? 'error' : void 0} />
            </Form.Item>
            <Form.Item name="password" rules={requiredField}>
              <Input.Password placeholder="Пароль" status={error ? 'error' : void 0} />
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
