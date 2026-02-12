import React from 'react';
import { LoginForm } from '@features/LoginForm';
import { LoginStyled } from './Login.styled';

export const LoginPage: React.FC = () => (
  <LoginStyled>
    <LoginForm />
  </LoginStyled>
);
