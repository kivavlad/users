import React, { useCallback } from 'react';

import { Layout, Button } from 'antd';

import { TOKEN_KEY } from '@shared/constants/auth';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';

import { HeadStyled } from './Head.styled';

export const Head: React.FC = () => {
  const { remove } = useLocalStorage();

  const handleLogout = useCallback(() => {
    remove(TOKEN_KEY);
  }, [remove]);

  return (
    <Layout.Header>
      <HeadStyled>
        <Button type="primary" onClick={handleLogout}>
          Выход
        </Button>
      </HeadStyled>
    </Layout.Header>
  );
};
