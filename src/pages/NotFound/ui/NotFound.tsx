import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { RoutePath } from '@shared/constants/urls';
import { NotFoundStyled } from './NotFound.styled';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    void navigate(RoutePath.ROOT);
  }, [navigate]);

  return (
    <NotFoundStyled>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={handleNavigate}>
            На главную
          </Button>
        }
      />
    </NotFoundStyled>
  );
};
