import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Typography, Button, Card, notification } from 'antd';
import { RoutePath } from "@shared/constants/urls";
import { useLogin } from "../model";
import { LoginFormStyled, WrapperStyled, FormStyled, buttonStyled } from './LoginForm.styled';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState("");
  const [passValue, setPassValue] = useState("");

  const { mutate: onLogin, isLoading, isError, isSuccess, error } = useLogin();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLoginValue(value);
  };

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginValue.trim() || !passValue.trim()) return;

    onLogin({ 
      login: loginValue.trim(), 
      password: passValue.trim()
    });
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
          <FormStyled onSubmit={handleSubmit}>
            <Input 
              placeholder="Логин"
              value={loginValue}
              onChange={handleLoginChange}
              status={isError ? 'error' : void 0}
            />
            <Input.Password
              placeholder="Пароль" 
              value={passValue}
              onChange={handlePassChange}
              status={isError ? 'error' : void 0}
            />
            <Button 
              type="primary"
              htmlType="submit"
              disabled={isLoading}
              className={buttonStyled}
              loading={isLoading}
            >
              Войти
            </Button>
          </FormStyled>
        </WrapperStyled>
      </Card>
    </LoginFormStyled>
  );
};
