import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Typography, Button, Card, notification } from 'antd';
import { RoutePath } from "@shared/constants/urls";
import { useLogin } from "../model";
import { rules } from "../lib/rules";
import { FormValues } from "../lib/values";
import { LoginFormStyled, WrapperStyled, buttonStyled } from './LoginForm.styled';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<FormValues>();
  const { mutate: onLogin, isLoading, isError, isSuccess, error } = useLogin();

  const handleSubmit = async () => {
    try {
      const { login, password } = await form.validateFields();
      onLogin({
        login: login.trim(),
        password: password.trim()
      });
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isError) {
      notification.error({
        message: error instanceof Error 
          ? error.message
          : 'Ошибка авторизации',
        placement: 'bottomRight',
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      void navigate(RoutePath.ROOT, { replace: true });
    }
  }, [isSuccess, navigate]);

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
          >
            <Form.Item
              name="login"
              rules={rules}
            >
              <Input placeholder="Логин" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={rules}
            >
              <Input.Password placeholder="Пароль" />
            </Form.Item>
            <Button 
              type="primary"
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
